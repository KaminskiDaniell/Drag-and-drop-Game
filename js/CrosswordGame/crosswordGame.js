class CrosswordGame extends Game {
    constructor(gameAreaId) {
        super(gameAreaId);

        this.loadGame();
    }

    loadGame() {
        this.crossword= $('<div>', {id: 'crossword'});
        this.crosswordType = CrosswordGame.crosswordType;
        this.getGameArea().append(this.crossword);

        this.gameObjects = [];

        let lowestSolutionLetter = this.getLowestSolutionLetter();

        for (var i in this.getCrosswordData()) {
            var word = this.getCrosswordData()[i];
            this.gameObjects.push(new WordGameObject(word, i, lowestSolutionLetter, this))
        }
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

    static loadImages() {
        return 0;
    }
}
