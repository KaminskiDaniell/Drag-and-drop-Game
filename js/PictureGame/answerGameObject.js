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
        this.object.text(answer);
    }


    click() {
        this.getGame().checkAnswer(this.answerNumber);
    }
}
