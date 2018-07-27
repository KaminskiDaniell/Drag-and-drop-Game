class AnswerGameObject extends GameObject {
    constructor(answerNumber, game) {
        super(game);

        this.canClick = true;
        this.answerNumber = answerNumber;
        this.object = $('<div>', {class: 'picture-answer'});
        this.object.on('click', () => {
            this.click();
        });
        this.getGame().object.append(this.object);

        let answer = this.getGame().getQuestion().answers[answerNumber];
        this.object.append($("<img>", {src: Game.folder + answer.picture, alt: answer.title, title: Locale.get('title', answer.title)}));
    }


    click() {
        if(this.canClick) {
            if(this.getGame().checkAnswer(this.answerNumber)) {
               this.object.addClass('correct-answer'); 
            }
            else {
               this.object.addClass('incorrect-answer'); 
            }
        }
    }

    setClick(click) {
        this.canClick = click;
    }

    loadLocale() {
        let answer = this.getGame().getQuestion().answers[this.answerNumber];
        this.object.find('img').attr('title', Locale.get('title', answer.title));
    }
}
