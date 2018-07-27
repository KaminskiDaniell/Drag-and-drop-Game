class AnswerGameObject extends GameObject {
    constructor(answerNumber, game) {
        super(game);

        this.answerNumber = answerNumber;
        this.object = $('<div>', {class: 'picture-answer'});
        this.object.on('click', () => {
            this.click();
        });
        this.getGame().object.append(this.object);

        let answer = this.getGame().getQuestion().answers[answerNumber];
        this.object.append($("<img>", {src: Game.folder + answer.picture, alt: answer.title, title: answer.title}));
    }


    click() {
        this.getGame().checkAnswer(this.answerNumber);
    }
}
