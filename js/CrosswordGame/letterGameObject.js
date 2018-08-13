class LetterGameObject extends GameObject {
    constructor(letter, i, solutionLetter, word, game) {
        super(game);
        this.letter = letter;

        this.filled = false;
        this.letterNumber = i;
        this.solutionLetter = solutionLetter;
        this.word = word;
        this.object = $('<div>', {class: 'letter' + (solutionLetter ? ' solution-letter' : '')});
        this.object.on('click', () => {
            this.click();
        });
        if (!this.normalize(this.letter).match(/[a-zł]/i)) {
            this.checkLetter(this.letter);
        }
        word.object.append(this.object);
    }

    check() {
        return this.normalize(this.object.text()) === this.normalize(this.letter);
    }

    click() {
        if(!this.object.hasClass('locked')) {
            this.word.setFocus(this.letterNumber);
        }
    }

    insertLetter(letter) {
        this.filled = true;
        if (!this.locked && letter.length === 1 && this.normalize(letter).match(/[a-zł]/i)) {
            this.checkLetter(letter);
            return true;
        }
        return false;
    }

    checkLetter(letter) {
        this.object.text(this.letter.toUpperCase());
        this.unsetActive();
        this.word.recordCorrectLetter();
    }

    normalize(letter) {
        if (letter.toLowerCase() === 'ł') {
            letter = 'l';
        }
        return letter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    removeLetter() {
        if(!this.locked) {
            this.object.text('');
        }
    }

    setActive() {
        this.object.addClass('active');
    }

    unsetActive() {
        this.object.removeClass('active');
    }

    lock() {
        this.locked = true;
        this.object.addClass('locked');
    }
}
