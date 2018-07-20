class LetterGameObject extends GameObject {
    constructor(letter, i, word, game) {
        super(game);
        this.letter = letter;
        this.shown = false;
        this.index = i;
        if (!(this.normalize(this.letter) === ' ')) {
            this.object = $('<div>', {id: i, class: "letter"});
            this.showLetter();
            word.append(this.object);
        }
        else {
            this.shown = true;
        }
    }


    showLetter() {
        if (!this.shown) {
            this.shown = true;
            this.object.append($('<div>', {}).text(this.letter.toUpperCase()));
        }
    }

    normalize(letter) {
        if (letter.toLowerCase() === 'ł') {
            letter = 'l';
        }
        return letter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }
}
