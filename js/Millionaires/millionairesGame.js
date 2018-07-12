class MillionairesGame extends Game {
    constructor(gameAreaId) {
        super(gameAreaId);
        this.addClickListener();
        this.createGameFields();
        MillionairesGame.currentLevel = 0;
        MillionairesGame.canClick = true;
        this.getInitQuestion();
    }

    resetColors() {
        $('.answer').each(function (i, obj) {
            obj.style.background = 'YellowGreen'
        })
    }

    getInitQuestion() {
        MillionairesGame.currentLevel += 1;
        this.gameObjects = new MillionairesGameObject(MillionairesGame.currentLevel, this);
        this.putQuestionIntoDiv();
    }

    getNewQuestion(interval = null) {
        if (interval)
            clearInterval(interval);
        MillionairesGame.currentLevel += 1;
        GameManager.get().gameObjects = new MillionairesGameObject(MillionairesGame.currentLevel, this);
        GameManager.get().resetColors();
        GameManager.get().putQuestionIntoDiv();
    }

    createGameFields() {
        var gameArea = this.getGameArea();
        gameArea.append($('<div>', {id: 'questionDiv'})
            .append($('<div>', {id: 'question'}))
            .append($('<div>', {id: 'answersDiv'})
                .append($('<div>', {id: '0', class: 'answer'}))
                .append($('<div>', {id: '1', class: 'answer'}))
                .append($('<div>', {id: '2', class: 'answer'}))
                .append($('<div>', {id: '3', class: 'answer'}))
            ));

        gameArea.append($('<div>', {id: 'prizesDiv'})
            .append($('<div>', {id: 'hintsDiv'}))
            .append($('<div>', {id: 'prizes'})
            ));

        gameArea.append($('<div>', {id: 'gameDiv'}));
    }

    putQuestionIntoDiv() {
        var question = this.gameObjects.questionObject;
        $('#question').text(question.question);
        $('#0').text(question.answers[0]);
        $('#1').text(question.answers[1]);
        $('#2').text(question.answers[2]);
        $('#3').text(question.answers[3]);
    }

    highlightCorrect(correct) {
        var div = $("#" + correct)[0];
        var old = div.style.background;
        var green = function (div) {
            if (div.style.background === old)
                div.style.background = '#00ff00';
            else
                div.style.background = old
        };
        return setInterval(green, 500, div);
    }

    calculatePercents() {
        console.log(MillionairesGame.currentLevel);
        return Math.round(((MillionairesGame.currentLevel - 1) / MillionairesGame.maxLevel) * 100)
    }

    setCanClick() {
        MillionairesGame.canClick = true;
    }

    addClickListener() {
        $(document).ready(function () {
            $('.answer').click(function (event) {
                if (MillionairesGame.canClick) {
                    MillionairesGame.canClick = false;
                    event.target.style.background = "#FFA500";
                    var correct = GameManager.get().gameObjects.questionObject.correctAnswer;
                    var interval = GameManager.get().highlightCorrect(correct);
                    if (event.target.id === correct) {
                        setTimeout(GameManager.get().getNewQuestion, 3000, interval);
                        setTimeout(GameManager.get().setCanClick, 3000)
                    }
                    else {
                        setTimeout(Snackbar.show, 1000, 'error', Locale.get('game', "_failure") + Locale.get('game', '_score') + GameManager.get().calculatePercents() + "%", true);
                        setTimeout(clearInterval, 3000, interval);
                        setTimeout(GameManager.set, 3000, MillionairesGame, 'game-area');
                    }
                }
            });
        });
    }
}

MillionairesGame.maxLevel = 20;
MillionairesGame.sources = {
    'easy': {
        'category1': [
            {
                question: "easy Question 1 category 1",
                answers: [
                    "BAD",
                    "BAD",
                    "GOOD",
                    "BAD"
                ],
                correctAnswer: '2'
            },
            {
                question: "easy Question 2 category 1",
                answers: [
                    "GOOD",
                    "BAD",
                    "BAD",
                    "BAD"
                ],
                correctAnswer: '0'
            },
            {
                question: "easy Question 3 category 1",
                answers: [
                    "BAD",
                    "BAD",
                    "BAD",
                    "GOOD"
                ],
                correctAnswer: '3'
            },
            {
                question: "easy Question 4 category 1",
                answers: [
                    "BAD",
                    "GOOD",
                    "BAD",
                    "BAD"
                ],
                correctAnswer: '1'
            },
        ],
        'category2': [
            {
                question: "easy Question 1 category 2",
                answers: [
                    "BAD",
                    "BAD",
                    "GOOD",
                    "BAD"
                ],
                correctAnswer: '2'
            },
            {
                question: "easy Question 2 category 2",
                answers: [
                    "GOOD",
                    "BAD",
                    "BAD",
                    "BAD"
                ],
                correctAnswer: '0'
            },
        ]
    },
    'medium': {
        'category1': [
            {
                question: "medium Question 1 category 1",
                answers: [
                    "BAD",
                    "BAD",
                    "GOOD",
                    "BAD"
                ],
                correctAnswer: '2'
            },
        ]
    },
    'hard': {
        'category1': [
            {
                question: "hard Question 1 category 1",
                answers: [
                    "BAD",
                    "BAD",
                    "GOOD",
                    "BAD"
                ],
                correctAnswer: '2'
            },
        ]
    }
};