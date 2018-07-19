class HangmanGame extends Game {
    constructor(gameAreaId) {
        super(gameAreaId);

        this.reloadGame();
    }

    reloadGame() {
        $('#letters-area').remove();
        $('#hangman').remove();
        this.stage = 0;
        this.createHangman();
        this.text = this.randomPhrase();
        this.mistakesAllowed = HangmanGame.numberOfAcceptableMistakes;
        this.setScores(this.correct);
        this.checked = 0;
        this.ended = false;
        this.usedLetters = {};
        this.createPhraseSpace(this.text);
    }

    static loadImages() {
        var getPath = function (i) {
            return Game.folder + HangmanGame.hangmanStagePath.replace('%d', i);
        }
        var images = [];
        for (var i = 0; i < HangmanGame.numberOfAcceptableMistakes; i++) {
            images.push(getPath(i));
        }

        images.forEach(function (entry) {
            var img = new Image;
            img.addEventListener('load', function () {
                Load.imageLoaded();
            });
            img.src = entry;
            img.style.display = "none";
            $('body').append(img);
        });
        return images.length;
    }

    createHangman() {
        this.hangman = $('<div>', {id: 'hangman'}).append($('<img>', {
            id: 'hangman-image',
            src: this.getHangmanStagePath()
        }));
        this.getGameArea().append(this.hangman);
    }

    randomPhrase() {
        if (!this.sources || this.sources.length == 0) {
            this.sources = HangmanGame.sources.slice();
        }
        var index = Math.floor(Math.random() * this.sources.length);
        var result = this.sources[index];
        this.sources.splice(index, 1);
        return result;
    }

    createPhraseSpace(text) {
        this.textLocalized = Locale.get('phrase', text);
        var letterObjects = this.textLocalized.split('');

        this.letterObjects = [];

        this.getGameArea().append($('<div>', {id: 'letters-area'}));

        var word = $('<div>', {class: 'word'});
        $('#letters-area').append(word);

        for (var i in letterObjects) {
            var letter = letterObjects[i];

            if (letter === ' ') {
                var word = $('#letters-area');
            }

            this.letterObjects.push(new LetterGameObject(letter, i, word, this));

            if (letter === ' ') {
                var word = $('<div>', {class: 'word'});
                $('#letters-area').append(word);
            }
        }
        ;
    }

    checkLetters(letter) {
        if (!this.usedLetters[letter]) {
            var correctLetter = false;
            for (var i in this.letterObjects) {
                var letterObject = this.letterObjects[i];
                if (letterObject.checkLetter(letter)) {
                    correctLetter = true;
                }
            }
            if (!correctLetter) {
                GameManager.get().recordMistake();
            }
            if (this.checked === this.letterObjects.length) {
                clearInterval(this.timeInterval);
                if (!this.ended) {
                    if (!this.callbackAdded) {
                        Snackbar.addCallback(function () {
                            GameManager.get().reloadGame();
                        });
                        this.callbackAdded = true;
                    }
                    Snackbar.show("success", '_success_header', '_success');
                    this.ended = true;
                    this.correct = true;
                }
            }
            this.usedLetters[letter] = true;
        }
    }

    setTimer() {
        if (!this.timeInterval) {
            var timer = $('<div>', {id: 'timer', class: 'timer left'}).append('0:00');
            this.getGameArea().prepend(timer);
        }
        else {
            var timer = $('#timer');
            timer.text('0:00');
        }
        var start = new Date;

        this.timeInterval = setInterval(function () {
            var time = parseInt((new Date - start) / 1000);
            timer.text(parseInt(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60);
        }, 1000);
    }

    addChecked() {
        this.checked++;
    }

    setScores(correct) {
        if (!this.scores) {
            this.scores = $('<div>', {class: 'scores right'}).append(0);
        }
        else {
            var score = parseInt(this.scores.text());
            if (correct) {
                score++;
            }
            this.scores.text(score);
        }
        this.getGameArea().prepend(this.scores);
    }

    recordMistake() {
        if (!this.ended) {
            this.mistakesAllowed--;
            if (this.mistakesAllowed == 0) {
                if (!this.callbackAdded) {
                    Snackbar.addCallback(function () {
                        GameManager.get().reloadGame();
                    });
                    this.callbackAdded = true;
                }
                Snackbar.show("error", '_fail_header', '_fail', false, this.textLocalized);
                this.scores.text(0);
                this.ended = true;
                this.correct = false;
            }
            this.replaceHangman(true);
            if (this.mistakesAllowed < 0) {
                return;
            }
        }
    }

    replaceHangman(increment = false) {
        if (increment) {
            this.stage++;
        }

        if (this.stage != HangmanGame.numberOfAcceptableMistakes) {
            $('#hangman-image').attr('src', this.getHangmanStagePath());
        }
        else {
            $('#hangman-image').removeAttr('src');
        }
    }

    getHangmanStagePath() {
        return this.getFolder() + HangmanGame.hangmanStagePath.replace('%d', this.stage);
    }
}
