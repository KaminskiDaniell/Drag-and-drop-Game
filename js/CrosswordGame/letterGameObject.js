class LetterGameObject extends GameObject {
    constructor(letter, wordObject, game) {
        super(game);
        this.object = $('<div>', {class: 'letter'});
        wordObject.append(this.object);
    }
}
