class CrosswordGame extends Game {
    constructor(gameAreaId) {
        super(gameAreaId);

        this.loadGame();
    }

    loadGame() {
        this.crossword= $('<table>', {id: 'crossword'});
        this.crosswordType = CrosswordGame.crosswordType;
        this.getGameArea().append(this.crossword);

        this.gameObjects = [];

        let lowestSolutionLetter = this.getLowestSolutionLetter();

        for (var i in this.getCrosswordData()) {
            var word = this.getCrosswordData()[i];
            this.gameObjects.push(new WordGameObject(word, i, lowestSolutionLetter, this))
        }

        this.setFocus(0);
    }

    getCrosswordData() {
        return CrosswordGame.crosswords[Locale.getLanguage()][this.crosswordType];
    }

    getLowestSolutionLetter(reload = false) {
        if(!reload && this.lowestSolutionLetter) {
            return this.lowestSolutionLetter;
        }

        for (var i in this.getCrosswordData()) {
            var word = this.getCrosswordData()[i];
            if(!this.lowestSolutionLetter) {
                this.lowestSolutionLetter = word.solutionLetter;
            }
            this.lowestSolutionLetter = this.lowestSolutionLetter > word.solutionLetter ? word.solutionLetter : this.lowestSolutionLetter;
        }

        return this.lowestSolutionLetter;
    }

    insertLetter(letter) {
        console.log(letter);
        if(letter === "Backspace" || letter === "ArrowLeft") {
            this.gameObjects[this.focus].prevLetter();
        }
        if(letter === 'Tab' || letter === "ArrowRight") {

        }
        else if(this.gameObjects[this.focus].insertLetter(letter) === 'next') {
            this.setFocus(this.focus + 1);
        }
    }

    setFocus(wordNumber) {
        if(typeof wordNumber == 'undefined') {
            wordNumber = this.focus ? this.focus : 0;
        }
        if(typeof this.focus == 'undefined') {
            this.focus = wordNumber;
        }
        else {
            this.gameObjects[this.focus].unsetActive();
            if(wordNumber > this.gameObjects.length - 1) {
                this.focus = 0;
            }
            else {
                this.focus = wordNumber;
            }
        }
        this.gameObjects[this.focus].setActive();
        this.gameObjects[this.focus].setFocus();
    }

    static loadImages() {
        return 0;
    }
}
