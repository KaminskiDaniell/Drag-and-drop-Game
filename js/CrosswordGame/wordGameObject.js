class WordGameObject extends GameObject {
    constructor(word, i, highestSolutionLetter, game) {
        super(game);
        this.wordNumber = i;
        this.word = word.word;
        this.solutionLetter = word.solutionLetter;
        this.highestSolutionLetter = highestSolutionLetter;

        this.createWord(this.word, this.wordNumber);
    }

    createWord(word, wordNumber) {
        let letters = word.split('');
        this.object = $('<div>', {id: wordNumber, class: 'word'});
        this.object.on('click', () => {
            this.click();
        });
        this.gameObjects = [];

        for(let i = 0; i < this.highestSolutionLetter - this.solutionLetter; i++) {
            let emptyHeader = $('<div>', {class: 'empty-letter-space'});
            this.object.append(emptyHeader);
        }

        var letterCount = 0;
        for(let i in letters) {
            let letter = letters[i];
            if(letter != ' ') {
                let solutionLetter = false;
                if(this.solutionLetter == i) {
                    solutionLetter = true;
                }
                this.gameObjects.push(new LetterGameObject(letter, letterCount, solutionLetter, this, this.getGame()));
                letterCount++;
            }
        }

        this.getGame().crossword.append(this.object);
    }

    setFocus(letterNumber) {
        if(typeof letterNumber == 'undefined') {
            letterNumber = this.focus ? this.focus : 0;
        }
        if(typeof this.focus == 'undefined') {
            this.focus = letterNumber;
        }
        else {
            this.gameObjects[this.focus].unsetActive();
        }

        if(letterNumber > this.gameObjects.length - 1) {
            this.focus = this.gameObjects.length - 1;
        }
        else if (letterNumber < 0) {
            this.focus = 0;
        }
        else {
            this.focus = letterNumber;
        }
        this.gameObjects[this.focus].setActive();
    }

    removeLetter() {
        this.gameObjects[this.focus].removeLetter();
    }

    beginLetter() {
        this.setFocus(0);
    }

    endLetter() {
        this.setFocus(this.gameObjects.length - 1);
    }

    nextLetter() {
        this.setFocus(this.focus + 1);
    }

    prevLetter() {
        this.setFocus(this.focus - 1);
    }

    setActive() {
        this.object.addClass('active');
    }

    unsetActive() {
        this.gameObjects[this.focus].object.removeClass('active');
        this.object.removeClass('active');
    }

    click() {
        this.getGame().setFocus(this.wordNumber, false);
    }

    insertLetter(letter) {
        if(this.gameObjects[this.focus].insertLetter(letter)) {
            checkIfCorrect();
            if(this.focus === this.gameObjects.length - 1) {
                this.setFocus(0);
                return 'next';
            }
            this.setFocus(this.focus + 1);
        }
    }

    check() {
        for(var i in this.gameObjects) {
            if(!this.gameObjects[i].check()) {
                return false;
            }
        }
        return true;
    }
}
