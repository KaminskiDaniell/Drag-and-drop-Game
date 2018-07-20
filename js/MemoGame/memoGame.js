class MemoGame extends Game {
    constructor(gameAreaId) {
        super(gameAreaId);

        this.loadGame();
    }

    loadGame() {
        this.gameObjects = [];
        this.memoLinks = {};
        this.checked = 0;

        Snackbar.addCallback(function () {
            GameManager.get().setTimer();
            GameManager.get().setScores();
        });


        this.memo = $('<div>', {id: 'memo', style: "width: " + (Math.ceil(Math.sqrt(MemoGame.sources.length * 2)) * 120) + "px"});
        this.getGameArea().append(this.memo);

        for(var i in MemoGame.sources) {
            var source = MemoGame.sources[i];
            this.memoLinks[source.title] = this.getFolder() + source.fileName;
            this.gameObjects.push(new MemoGameObject(this.getFolder() + source.fileName,'image', this));
            this.gameObjects.push(new MemoGameObject(source.title, 'title', this));
        }        

        var shuffle = function (array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffle(this.gameObjects);
        for (var i in this.gameObjects) {
            var entry = this.gameObjects[i];
            entry.attach();
        }
    }

    match(memo1, memo2) {
        this.memoRevealed = null;
        if((this.memoLinks[memo1.val] === memo2.val) || (this.memoLinks[memo2.val] === memo1.val)) {
            this.check();
            memo1.check();
            memo2.check();
            this.addScore();
        }
        else {
            this.toHide = [memo1, memo2];
            memo1.hideDelayed();
            memo2.hideDelayed();
        }
    }

    check() {
        this.checked++;
        if(this.checked === MemoGame.sources.length) {
            clearInterval(this.timeInterval);
            Snackbar.show('success', '_success_header', '_success');
        }
    }

    setTimer() {
        if (!this.timeInterval) {
            var start = new Date;
            var timer = $('<div>', {class: 'timer left'}).append('0:00');
            this.getGameArea().append(timer);

            this.timeInterval = setInterval(function () {
                var time = parseInt((new Date - start) / 1000);
                timer.text(parseInt(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60);
            }, 1000);
        }
    }

    addScore() {
        this.scores.text(this.checked);
    }

    setScores() {
        if (!this.scores) {
            this.scores = $('<div>', {class: 'scores right'}).append('0');
            this.getGameArea().append(this.scores);
        }
    }

    static loadImages() {
        var images = MemoGame.sources.concat([{'fileName': 'MemoGame/bulb.png'}]);
        for (var i in images) {
            var img = new Image;
            img.addEventListener('load', function () {
                Load.imageLoaded();
            });
            img.src = Game.folder + images[i].fileName;
            img.style.display = "none";
            $('body').append(img);
        }
        return images.length;
    }
}
