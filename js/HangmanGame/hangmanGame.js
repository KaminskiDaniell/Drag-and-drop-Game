class HangmanGame extends Game {
    constructor(gameAreaId) {
        super(gameAreaId);

        Snackbar.addCallback(function () {
            GameManager.get().setTimer();
            GameManager.get().setScores();
        });

        this.sources = HangmanGame.sources;
        this.reloadGame();
    }

    reloadGame() {
        $('#letters-area').remove();
        $('#hangman').remove();
        this.createHangman();
        this.text = this.randomPhrase();
        this.mistakesAllowed = HangmanGame.numberOfAcceptableMistakes;
        this.setScores();
        this.checked = 0;
        this.ended = false;
        this.usedLetters = {};
        this.createPhraseSpace(this.text);
    }

    createHangman() {
        this.hangman = $('<div>', {id: 'hangman'}).append($('<img>', {id: 'hangman-image'}));
        this.getGameArea().append(this.hangman);
    }

    randomPhrase(){
        if(this.sources.length === 0){
            this.sources = HangmanGame.sources;
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

        for(var i in letterObjects) {
            var letter = letterObjects[i];
            
            this.letterObjects.push(new LetterGameObject(letter, i, this));
        };
    }

    checkLetters(letter){
        if(!this.usedLetters[letter]) {
            var correctLetter = false;
            for(var i in this.letterObjects){
                var letterObject = this.letterObjects[i];
                if(letterObject.checkLetter(letter)){
                    correctLetter = true;                 
                }
            }
            if (!correctLetter) {
                GameManager.get().recordMistake();
            }
            if(this.checked === this.letterObjects.length){
                clearInterval(this.timeInterval);
                if(!this.ended) {
                    if(!this.callbackAdded) {
                        Snackbar.addCallback(function() {
                            GameManager.get().reloadGame(); 
                        });
                        this.callbackAdded = true;
                    }
                    Snackbar.show("success", '_success');
                    this.ended = true;
                }
            }
            this.usedLetters[letter] = true;
        }
    }

    setTimer() {
        if(!this.timeInterval) {
            var timer = $('<div>', { id: 'timer', class : 'timer left'}).append('0:00');
            this.getGameArea().prepend(timer);
        }
        else {
            var timer = $('#timer');
            timer.text('0:00');
        }
        var start = new Date;

        this.timeInterval = setInterval(function() {
            var time = parseInt((new Date - start) / 1000);
            timer.text(parseInt(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60);
        }, 1000);
    }

    setScores() {
        if(!this.scores) {
            this.scores = $('<div>', {class : 'scores right'}).append(this.mistakesAllowed);
        }
        else{
            this.scores.text(this.mistakesAllowed);
        }
        this.getGameArea().prepend(this.scores);
    }

    addChecked() {
        this.checked++;
    }

    recordMistake() {
        if(!this.ended) {
            this.mistakesAllowed--;
            if(this.mistakesAllowed == 0) {
                if(!this.callbackAdded) {
                    Snackbar.addCallback(function() {
                        GameManager.get().reloadGame(); 
                    });
                    this.callbackAdded = true;
                }
                Snackbar.show("error", '_fail');
                this.ended = true;
            }
            if(this.mistakesAllowed < 0 ) {
                return;
            }
            this.scores.text(this.mistakesAllowed);
        }
    }
}

HangmanGame.numberOfAcceptableMistakes = 3;
HangmanGame.sources = [
    '_citizen_kane',
    '_vertigo',
    '_la_regle_du_jeu',
    '_2001_a_space_odyssey',
    '_tokyo_monogatari',
    '_otto_e_mezzo',
    '_the_godfather',
    '_sunrise_a_song_of_two_humans',
    '_the_searchers',
    '_shichinin_no_samurai'
]
