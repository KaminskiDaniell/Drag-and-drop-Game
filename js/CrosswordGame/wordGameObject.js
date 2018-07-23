class WordGameObject extends GameObject {
    constructor(word, i, lowestSolutionLetter, game) {
        super(game);
        this.wordNumber = i;
        this.word = word.word;
        this.solutionLetter = word.solutionLetter;
        this.lowestSolutionLetter = lowestSolutionLetter;

        this.createWord(this.word, this.wordNumber);
    }

    createWord(word, wordNumber) {
        let letters = word.split('');
        this.object = $('<div>', {id: wordNumber, class: 'word'});
        this.letters = [];

        let emptyHeader = $('<div>', {class: 'empty-letter-space', style: 'width: ' + (60 * (this.solutionLetter - this.lowestSolutionLetter)) + 'px'});
        this.object.append(emptyHeader);
        for(let i in letters) {
            let letter = letters[i];
            this.letters.push(new LetterGameObject(letter, this.object, this.getGame()));
        }
        let emptyFooter = $('<div>', {class: 'empty-letter-space', style: 'width: ' + (60 * (this.solutionLetter - this.lowestSolutionLetter)) + 'px'});
        this.object.append(emptyFooter);

        this.getGame().crossword.append(this.object);
    }
}
