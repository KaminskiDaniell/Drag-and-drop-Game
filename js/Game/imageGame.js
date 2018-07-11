class ImageGame extends Game {
    constructor(gameAreaId) {
        super(gameAreaId);

        this.gameObjects = [];
        this.zIndex = 0;
        this.matched = 0;

        this.horizontalOffset = 140;
        this.verticalOffset = 80;

        
        for(var i in ImageGame.sources) {
            var entry = ImageGame.sources[i];
            if(entry.fileName.match(/\.(jpe?g|png|gif)$/) ) { 
                this.gameObjects.push(new ImageGameObject(entry.fileName, entry.title, i, this));
            } 
        }

        var shuffle = function(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        var numberOfImages = this.gameObjects.length;

        var imageObject = this.gameObjects[0];

        this.maxHeight = Math.floor(this.gameArea.outerHeight(true) /this.verticalOffset);
        this.offset = (this.gameArea.outerHeight(true) - ((Math.floor(this.maxHeight) - 1) * this.verticalOffset + imageObject.image.outerHeight(true))) / 2;
        this.maxHeight = Math.ceil(numberOfImages / Math.ceil(numberOfImages /this.maxHeight));


        shuffle(this.gameObjects);
        for(var i in this.gameObjects) {
            entry = this.gameObjects[i];
            entry.attach('image');
            this.move(entry.image, i);
        };
        shuffle(this.gameObjects);
        for(var i in this.gameObjects) {
            entry = this.gameObjects[i];
            entry.attach('title');
            this.move(entry.title, i);
        };
    }

    move(item, i) {
        i = parseInt(i);
        var sign = item.hasClass('right') ? -1 : 1;
        var x = sign * Math.ceil(((i + 1) / this.maxHeight) - 1) * this.horizontalOffset;
        var y = this.offset + Math.ceil(((i + 1) % (this.maxHeight + 0.0001)) - 1) * Math.max(this.verticalOffset, this.gameArea.outerHeight(true) / (this.maxHeight + 1));
        // translate the element
        item.css('transform', 'translate(' + x + 'px, ' + y + 'px)');
        item.css('webkitTransform', item.css('transform'));

        // update the posiion attributes
        item.attr('data-x', x);
        item.attr('data-y', y);
    }

    setTimer(gameAreaId) {
        if(!this.timeInterval) {
            var start = new Date;
            var timer = $('<div>', {class : 'timer left'}).append('0');
            $('#' + gameAreaId).append(timer);

            this.timeInterval = setInterval(function() {
                timer.text(parseInt((new Date - start) / 1000));
            }, 1000);
        }
    }

    setScores(gameAreaId) {
        if(!this.scores) {
            this.scores = $('<div>', {class : 'scores right'}).append('0');
            $('#' + gameAreaId).append(this.scores);
        }
    }

    addScore() {
        this.scores.text(this.matched);
    }
    

    reloadLocale(){
        this.gameObjects.forEach(function(entry) {
            entry.title.text(Locale.get('title', entry.name));
        });
    }

    match(element1, element2) {
        for(var i = 0; i < this.gameObjects.length; i++) {
            var entry = this.gameObjects[i];
            if((entry.image[0] === element1 && entry.title[0] === element2) || (entry.image[0] === element2 && entry.title[0] === element1)){
                entry.markAsMatched();
                return true;
            }
        }
        return false;
    }
    
    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    getZIndex() {
        return ++this.zIndex;
    }

    getGameArea() {
        return this.gameArea;
    }
}

ImageGame.sources = [
    {
        'fileName': '1.jpg',
        'title': '_citizen_kane'
    },
    {
        'fileName': '2.jpg',
        'title' : '_vertigo',
    },
    {
        'fileName': '3.jpg',
        'title': '_la_regle_du_jeu',
    },
    {
        'fileName': '4.jpg',
        'title': '_2001_a_space_odyssey',
    },
    {
        'fileName': '5.jpg',
        'title': '_tokyo_monogatari'
    },
    {
        'fileName': '6.jpg',
        'title': '_otto_e_mezzo'
    },
    {
        'fileName': '7.jpg',
        'title': '_the_godfather'
    },
    {
        'fileName': '8.jpg',
        'title': '_sunrise_a_song_of_two_humans'
    },
    {
        'fileName': '9.jpg',
        'title': '_the_searchers'
    },
    {
        'fileName': '10.jpg',
        'title': '_shichinin_no_samurai'
    },
];
