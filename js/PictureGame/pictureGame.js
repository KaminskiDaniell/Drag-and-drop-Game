class PictureGame extends Game {
    constructor(gameAreaId, version, className) {
        super(gameAreaId, version, className);

        this.loadGame();
    }

    loadGame() {
        this.object = $('<div>', {id: 'picture-game'});
        this.getGameArea().append(this.object);
        if (!this.questionNumber) {
            this.questionNumber = 0;
        }

        this.createQuestion();
        this.createAnswers();
        this.appendAnswers();

        Snackbar.addCallback(function () {
            GameManager.get().setTimer();
            GameManager.get().setScores();
        });

    }

    getQuestion() {
        return PictureGame.questions[this.questionNumber];
    }

    getQuestionNumber() {
        return this.questionNumber;
    }

    createQuestion() {
        this.questionGameObject = new QuestionGameObject(this);
    }

    appendAnswers() {
        let pictureAnswers = $('<div>', {class: 'picture-answers'});
        this.object.append(pictureAnswers);
        this.answerGameObjects.forEach(function (entry) {
            console.log(entry);
            pictureAnswers.append(entry.object);
        })
    }

    createAnswers() {
        this.answerGameObjects = [];
        for (var i in this.getQuestion().answers) {
            this.answerGameObjects.push(new AnswerGameObject(i, this));
        }
    }

    setTimer() {
        this.timerSet = true;
        if (!this.timeInterval) {
            var timer = $('<div>', {id: 'timer', class: 'timer left'}).append('0:00');
            this.getGameArea().prepend(timer);
        }
        else {
            var timer = $('#timer');
            timer.text('0:00');
        }
        var start = new Date;

        this.timeInterval = setInterval(function () {
            var time = parseInt((new Date - start) / 1000);
            timer.text(parseInt(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60);
        }, 1000);
    }

    setScores(correct) {
        if (!this.scores) {
            this.scores = $('<div>', {class: 'scores right'}).append(0);
        }
        else {
            var score = parseInt(this.scores.text());
            if (correct) {
                score++;
            }
            this.scores.text(score);
        }
        this.getGameArea().prepend(this.scores);
    }

    static loadImages() {
        return 0;
    }
}
