class QuizGame extends Game {
    constructor(gameAreaId) {
        super(gameAreaId);
        Snackbar.removeCallbacks();

        // static vars to control game
        QuizGame.hintsUsed = 0;
        QuizGame.gameBegun = false;
        QuizGame.currentLevel = 0;
        QuizGame.canClick = true;
        QuizGame.fiftyUsed = false; //can use only once per question
        QuizGame.skipsLeft = 2; //can use x times

        this.lastQuestions = [];
        this.createGameFields();
        this.addClickListeners();
        this.getInitQuestion();
    }

    resetColors() {
        $('.answerBlock').each(function (i, obj) {
            obj.style.background = 'chocolate'
        })
    }

    highlightTwoBadAnswers() {
        var highlighted = 0;
        var correct = GameManager.get().gameObjects.questionObject.correctAnswer;
        while (highlighted < 2) {
            var random = Math.floor(Math.random() * 4).toString();
            if (random !== correct) {
                var selector = $("#" + random);
                if (selector[0].style.backgroundColor !== 'firebrick') {
                    selector[0].style.backgroundColor = 'firebrick';
                    highlighted++;
                }
            }
        }
        QuizGame.hintsUsed++;
    }

    createGameObject() {
        do {
            var gameObject = new QuizGameObject(QuizGame.currentLevel, this);
            var id = gameObject.difficulty + gameObject.category + gameObject.question;
        } while (this.lastQuestions.indexOf(id) >= 0);
        this.lastQuestions.push(id);
        return gameObject
    }

    getInitQuestion() {
        QuizGame.currentLevel += 1;
        this.gameObjects = this.createGameObject();
        this.putQuestionIntoDiv();
    }

    skipQuestion() {
        this.gameObjects = this.createGameObject();
        QuizGame.fiftyUsed = false;
        this.resetColors();
        this.putQuestionIntoDiv();
    }

    getNewQuestion(interval = null) {
        if (interval)
            clearInterval(interval);
        QuizGame.currentLevel += 1;
        QuizGame.fiftyUsed = false;
        GameManager.get().gameObjects = GameManager.get().createGameObject();
        GameManager.get().resetColors();
        GameManager.get().putQuestionIntoDiv();
    }

    createGameFields() {
        var gameArea = this.getGameArea();
        gameArea.append($('<div>', {id: 'questionDiv'})
            .append($('<div>', {id: 'question'}).append($('<div>', {id: 'questionBlock'})))
            .append($('<div>', {id: 'answersDiv'})
                .append($('<div>', {class: 'answer'}).append($('<div>', {id: '0', class: 'answerBlock'})))
                .append($('<div>', {class: 'answer'}).append($('<div>', {id: '1', class: 'answerBlock'})))
                .append($('<div>', {class: 'answer'}).append($('<div>', {id: '2', class: 'answerBlock'})))
                .append($('<div>', {class: 'answer'}).append($('<div>', {id: '3', class: 'answerBlock'})))
            ));

        gameArea.append($('<div>', {id: 'prizesDiv'})
            .append($('<div>', {id: 'hintsDiv'})
                .append($('<img>', {id: 'fiftyFifty', class: 'hint', src: Game.folder + '/5050.png'}))
                .append($('<img>', {id: 'skip', class: 'hint', src: Game.folder + '/skip.svg'})))
        );

        gameArea.append($('<div>', {id: 'gameDiv'}));
    }

    putQuestionIntoDiv() {
        var question = this.gameObjects.questionObject;
        $('#questionBlock').text(question.question);
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
                div.style.background = '#00ff00'
            else
                div.style.background = old
        };
        return setInterval(green, 500, div);
    }

    calculatePercents() {
        return Math.round(((QuizGame.currentLevel - 1) / QuizGame.maxLevel) * 100)
    }

    setCanClick() {
        QuizGame.canClick = true;
    }

    addClickListeners() {
        $(document).ready(function () {
            $('.answerBlock').click(function (event) {
                if (QuizGame.canClick) {
                    QuizGame.canClick = false;
                    event.target.style.background = "#FFA500";
                    var correct = GameManager.get().gameObjects.questionObject.correctAnswer;
                    var interval = GameManager.get().highlightCorrect(correct);
                    if (event.target.id === correct) {
                        setTimeout(GameManager.get().getNewQuestion, 3000, interval);
                        setTimeout(GameManager.get().setCanClick, 3000)
                    }
                    else {
                        setTimeout(Snackbar.show, 1000, 'error', Locale.get('game', "_failure") + Locale.get('game', '_score') + GameManager.get().calculatePercents() + "% Hints used:" + QuizGame.hintsUsed, true);
                        setTimeout(clearInterval, 3000, interval);
                    }
                }
            });
            $('#fiftyFifty').click(function () {
                if (QuizGame.canClick && !QuizGame.fiftyUsed) {
                    GameManager.get().highlightTwoBadAnswers();
                    QuizGame.fiftyUsed = true;
                }
            });
            $('#skip').click(function () {
                if (QuizGame.canClick && QuizGame.skipsLeft > 0) {
                    QuizGame.skipsLeft--;
                    GameManager.get().skipQuestion();
                }
            });


            var reset = function () {
                if (!QuizGame.gameBegun) {
                    QuizGame.gameBegun = true
                }
                else {
                    QuizGame.gameBegun = false;
                    GameManager.set(QuizGame, 'game-area', true);
                }
            };
            Snackbar.addCallback(reset)
        });
    }
}

QuizGame.maxLevel = 20;
QuizGame.sources = {
    'easy': {
        'wszystko': [
            {
                question: "Jak 16 lipca Wojtek był w pracy?",
                answers: [
                    "Przed 9",
                    "Pomiędzy 9 a 10",
                    "Po 11",
                    "Pomiędzy 10 a 11"
                ],
                correctAnswer: '2'
            },
            {
                question: "Kto był Mistrzem Świata w piłce nożnej w 2018r",
                answers: [
                    "Francja",
                    "Chorwacja",
                    "Brazylia",
                    "Niemcy"
                ],
                correctAnswer: '0'
            },
            {
                question: "Czy warto było szaleć",
                answers: [
                    "w świat?",
                    "znów?",
                    "w domu?",
                    "tak?"
                ],
                correctAnswer: '3'
            },
            {
                question: "Ile razy Brazylia wygrała tytuł mistrza świata w piłce nożnej?",
                answers: [
                    "3",
                    "5",
                    "ani razu",
                    "7"
                ],
                correctAnswer: '1'
            },
        ],
        'category2': [
            {
                question: "Dokończ słowa piosenki: \"Do domu wrócimy.. \"",
                answers: [
                    "Nakarmimy psa",
                    "Połozymy się spać",
                    "W piecu napalimy",
                    "Szybko tak"
                ],
                correctAnswer: '2'
            },
            {
                question: "Jaką komendą wyłączyć process w systemie operacyjnym linux",
                answers: [
                    "kill",
                    "detach",
                    "remove",
                    "shutdown"
                ],
                correctAnswer: '0'
            },
            {
                question: "Ile lat ma wiek",
                answers: [
                    "100",
                    "Zależy kogo",
                    "Za mało danych by stwierdzić",
                    "1000"
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
