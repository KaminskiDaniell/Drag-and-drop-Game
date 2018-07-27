class AnswerGameObject extends GameObject {
    constructor(answerNumber, game) {
        super(game);

        this.object = $('<div>', {class: 'picture-answer'});

        this.setAnswer(answerNumber);
    }

    setAnswer(answerNumber) {
        let answer = this.getGame().getQuestion().answers[answerNumber];
        this.object.text(answer);
    }
}
