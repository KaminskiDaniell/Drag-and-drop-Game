class QuestionGameObject extends GameObject {
    constructor(game) {
        super(game);

        this.object = $('<div>', {class: 'picture-question'});
        this.getGame().object.append(this.object);

        this.object.text(this.getLocalizedQuestion());
    }

    getLocalizedQuestion() {
        return Locale.get('question', this.getGame().getQuestion().question);
    }
    
    loadLocale() {
        this.object.text(this.getLocalizedQuestion());
    }
}
