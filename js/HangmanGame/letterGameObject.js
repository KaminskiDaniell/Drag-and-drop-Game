class LetterGameObject extends GameObject {
    constructor(letter, i, game) {
        super(game);
        this.letter = letter;
        this.shown = false;
        this.index = i;
        this.object = $('<div>', {id: i, class: "letter" + (this.normalize(this.letter) === ' ' ? ' space' : '')});
        if(!this.normalize(this.letter).match(/[a-zł]/i)){
            this.showLetter();
        }

        this.getGame().getGameArea().find('#letters-area').append(this.object);
    }

    checkLetter(letter){
        if(letter.length > 1){
            return true;
        }
        if(this.normalize(letter) === this.normalize(this.letter)){
            this.showLetter();      
            return true;
        }
        if(!this.normalize(letter).match(/[a-z]/i)) {
            return true;
        }
        return false;
    }

    showLetter() {
        if(!this.shown) {
            this.shown = true;
            this.getGame().addChecked();
            this.object.append($('<div>', {}).text(this.letter.toUpperCase()));
        }
    }

    normalize(letter){
        if(letter.toLowerCase() === 'ł'){
            letter = 'l';
        }
        return letter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }
}
