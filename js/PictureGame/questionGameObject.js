class QuestionGameObject extends GameObject {
    constructor(game) {
        super(game);

        this.object = $('<div>', {class: 'picture-question'}).text(this.getGame().getQuestionNumber());
        this.getGame().object.append(this.object);

        this.setQuestion();
    }

    setQuestion() {
        let question = this.getGame().getQuestion().question;
        this.object.text(question);
    }
}
