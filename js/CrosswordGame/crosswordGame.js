class CrosswordGame extends Game {
    constructor(gameAreaId, version, className) {
        super(gameAreaId, version, className);

        this.loadGame();
    }

    loadGame() {
        this.crossword = $('<div>', {id: 'crossword'});
        this.crosswordType = CrosswordGame.crosswordType;
        this.getGameArea().append(this.crossword);

        Snackbar.addCallback(function () {
            GameManager.get().setTimer();
            GameManager.get().setScores();
        });

        this.gameObjects = [];
        this.checkedWords = {};
        this.allowFocus = true;

        let highestSolutionLetter = this.getHighestSolutionLetter();

        for (var i in this.getCrosswordData()) {
            var word = this.getCrosswordData()[i];
            this.gameObjects.push(new WordGameObject(word, i, highestSolutionLetter, this))
        }
        this.addHints();

        this.setFocus(0);
    }

    getAllowFocus() {
        return this.allowFocus;
    }

    makeHintsTable() {
        var table = document.createElement('table');
        table.classList.add('hintsTable');
        let crossword = this.getCrosswordData();
        for (var i = 0; i < crossword.length; i++) {
            var row = document.createElement('tr');
            var cell = document.createElement('td');
            cell.id = "word" + (i);
            cell.textContent = i + 1 + '. ' + crossword[i]['definition'];
            row.appendChild(cell);
            table.appendChild(row);
        }
        return table;
    }

    addHints() {
        this.hints = $('<div>', {id: 'crosswordHints'});
        this.getGameArea().append(this.hints.append(this.makeHintsTable()));
    }

    getCrosswordData() {
        return CrosswordGame.crosswords[Locale.getLanguage()][this.crosswordType];
    }

    getHighestSolutionLetter(reload = false) {
        if (!reload && this.highestSolutionLetter) {
            return this.highestSolutionLetter;
        }

        for (var i in this.getCrosswordData()) {
            var word = this.getCrosswordData()[i];
            word.solutionLetter--; //Begin indexing from 1
            if (!this.highestSolutionLetter) {
                this.highestSolutionLetter = word.solutionLetter;
            }
            this.highestSolutionLetter = this.highestSolutionLetter < word.solutionLetter ? word.solutionLetter : this.highestSolutionLetter;
        }

        return this.highestSolutionLetter;
    }

    insertLetter(letter) {
        if (letter === "Backspace" || letter === "ArrowLeft") {
            if (letter === "Backspace") {
                this.gameObjects[this.focus].removeLetter();
            }
            this.gameObjects[this.focus].prevLetter();
        }
        else if (letter === 'Tab' || letter === "ArrowRight" || letter === " ") {
            this.gameObjects[this.focus].nextLetter();
        }
        else if (letter === 'ArrowUp') {
            this.prevWord();
        }
        else if (letter === 'ArrowDown' || letter === 'Enter') {
            this.nextWord();
        }
        else if (letter === 'Delete') {
            this.gameObjects[this.focus].removeLetter();
        }
        else if (letter === '^' || letter === '0') {
            this.gameObjects[this.focus].beginLetter();
        }
        else if (letter === '$') {
            this.gameObjects[this.focus].endLetter();
        }
        else if (letter > 0 || letter < 10) {
            this.setFocus(parseInt(letter) - 1, false);
        }
        else {
            if (this.gameObjects[this.focus].insertLetter(letter) === 'next') {
                this.nextWord(false);
            }
        }
    }

    setFocus(wordNumber, letterFocus = true) {
        if (typeof wordNumber == 'undefined') {
            wordNumber = this.focus ? this.focus : 0;
        }
        wordNumber = parseInt(wordNumber);
        if (typeof this.focus == 'undefined') {
            this.focus = wordNumber;
        }
        else if(this.allowFocus) {
            this.gameObjects[this.focus].unsetActive();
            if (!((wordNumber > this.gameObjects.length - 1) || (wordNumber < 0))) {
                if (letterFocus) {
                    this.setLetterFocusOffset(this.gameObjects[this.focus], this.gameObjects[wordNumber]);
                }
                this.focus = wordNumber;
                if(!letterFocus) {
                    this.gameObjects[this.focus].setFocus(0);
                }
            }
        }
        if(this.allowFocus) {
            this.gameObjects[this.focus].setActive();
            this.gameObjects[this.focus].setFocus();
        }
    }

    unsetFocus() {
        this.gameObjects[this.focus].unsetActive();
        this.allowFocus = false;
    }

    setLetterFocusOffset(from, to) {
        to.setFocus(from.focus - from.solutionLetter + to.solutionLetter);
    }

    getFocus() {
        return this.focus;
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

    prevWord(letterFocus = true) {
        for(let i = this.focus - 1; i >= 0; i--) {
            if(!this.checkedWords[i]) {
                this.setFocus(i, letterFocus);
                break;
            }
        }
    }

    nextWord(letterFocus = true) {
        for(let i = this.focus + 1; i < this.gameObjects.length; i++) {
            if(!this.checkedWords[i]) {
                this.setFocus(i, letterFocus);
                break;
            }
        }
    }

    check(wordNumber) {
        this.checkedWords[wordNumber] = true;
        this.setScores(true);
        if (this.score === this.gameObjects.length) {
            clearInterval(this.timeInterval);
            Snackbar.removeCallbacks();
            Snackbar.show("success", '_success_header', '_success');
            this.unsetFocus();
        }
    }

    static loadImages() {
        return 0;
    }
}
