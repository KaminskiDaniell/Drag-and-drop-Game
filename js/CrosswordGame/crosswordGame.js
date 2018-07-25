class CrosswordGame extends Game {
    constructor(gameAreaId, version, className) {
        super(gameAreaId, version, className);

        this.loadGame();
    }

    loadGame() {
        this.crossword= $('<table>', {id: 'crossword'});
        this.crosswordType = CrosswordGame.crosswordType;
        this.getGameArea().append(this.crossword);

        Snackbar.addCallback(function () {
            GameManager.get().setTimer();
            GameManager.get().setScores();
        });

        this.gameObjects = [];

        let highestSolutionLetter = this.getHighestSolutionLetter();

        for (var i in this.getCrosswordData()) {
            var word = this.getCrosswordData()[i];
            this.gameObjects.push(new WordGameObject(word, i, highestSolutionLetter, this))
        }

        this.setFocus(0);
    }

    getCrosswordData() {
        return CrosswordGame.crosswords[Locale.getLanguage()][this.crosswordType];
    }

    getHighestSolutionLetter(reload = false) {
        if(!reload && this.highestSolutionLetter) {
            return this.highestSolutionLetter;
        }

        for (var i in this.getCrosswordData()) {
            var word = this.getCrosswordData()[i];
            word.solutionLetter--; //Begin indexing from 1
            if(!this.highestSolutionLetter) {
                this.highestSolutionLetter = word.solutionLetter;
            }
            this.highestSolutionLetter = this.highestSolutionLetter < word.solutionLetter ? word.solutionLetter : this.highestSolutionLetter;
        }

        return this.highestSolutionLetter;
    }

    insertLetter(letter) {
        if(letter === "Backspace" || letter === "ArrowLeft") {
            this.gameObjects[this.focus].prevLetter();
            if(letter === "Backspace") {
                this.gameObjects[this.focus].removeLetter();
            }
        }
        else if(letter === 'Tab' || letter === "ArrowRight" || letter === " ") {
            this.gameObjects[this.focus].nextLetter();
        }
        else if(letter === 'ArrowUp') {
            this.prevWord();
        }
        else if(letter === 'ArrowDown' || letter === 'Enter') {
            this.nextWord();
        }
        else if(letter === 'Delete') {
            this.gameObjects[this.focus].removeLetter();
        }
        else if(letter === '^' || letter === '0') {
            this.gameObjects[this.focus].beginLetter();
        }
        else if(letter === '$') {
            this.gameObjects[this.focus].endLetter();
        }
        else if(letter > 0 || letter < 10) {
            this.setFocus(parseInt(letter) - 1);
        }
        else {
            if(this.gameObjects[this.focus].insertLetter(letter) === 'next') {
                this.setFocus(this.focus + 1, false);
            }
        }
    }

    setFocus(wordNumber, letterFocus = true) {
        if(typeof wordNumber == 'undefined') {
            wordNumber = this.focus ? this.focus : 0;
        }
        wordNumber = parseInt(wordNumber);
        if(typeof this.focus == 'undefined') {
            this.focus = wordNumber;
        }
        else {
            this.gameObjects[this.focus].unsetActive();
            if(!((wordNumber > this.gameObjects.length - 1) || (wordNumber < 0))) {
                if(letterFocus) {
                    this.setLetterFocusOffset(this.gameObjects[this.focus], this.gameObjects[wordNumber]);
                }
                this.focus = wordNumber;
            }
        }
        this.gameObjects[this.focus].setActive();
        this.gameObjects[this.focus].setFocus();
    }

    setLetterFocusOffset(from, to) {
        to.setFocus(from.focus - from.solutionLetter + to.solutionLetter);
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

    setScores(correct) {
        if (!this.scores) {
            this.scores = $('<div>', {class: 'scores right'}).append(0);
            this.score = 0;
        }
        else {
            if (correct) {
                this.score++;
            }
            this.scores.text(this.score);
        }
        this.getGameArea().prepend(this.scores);
    }

    prevWord() {
        this.setFocus(this.focus - 1);
    }

    nextWord() {
        this.setFocus(this.focus + 1);
    }

    check() {
        this.setScores(true);
        if(this.score === this.gameObjects.length) {
            clearInterval(this.timeInterval);
            Snackbar.removeCallbacks();
            Snackbar.show("success", '_success_header', '_success');
        }
    }

    static loadImages() {
        return 0;
    }
}
