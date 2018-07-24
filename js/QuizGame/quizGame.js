class QuizGame extends Game {
    constructor(gameAreaId, version) {
        super(gameAreaId, version);
        Snackbar.removeCallbacks();

        // static vars to control game
        QuizGame.hintsUsed = 0;
        QuizGame.gameBegun = false;
        QuizGame.currentLevel = 0;
        QuizGame.canClick = true;
        QuizGame.fiftyUsed = false; //can use only once per question
        QuizGame.skipsLeft = 2; //can use x times
        QuizGame.maxNoOfSkips = 2; //same as skipsLeft (for score);

        this.lastQuestions = [];
        this.createGameFields();
        this.addClickListeners();
        this.getInitQuestion();
    }

    resetColors() {
        $('.answerBlock').each(function (i, obj) {
            obj.style.background = '#e5e5e5';
            obj.style.color = "#484848"
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
                    selector[0].style.color = 'white';
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
        GameManager.get().changePictureOdGameDiv(QuizGame.currentLevel);
        QuizGame.currentLevel += 1;
        if (QuizGame.currentLevel <= QuizGame.maxLevel) {
            QuizGame.fiftyUsed = false;
            GameManager.get().gameObjects = GameManager.get().createGameObject();
            GameManager.get().resetColors();
            GameManager.get().putQuestionIntoDiv();
        }
        else {
            var score = GameManager.get().getFinalStatistics();
            setTimeout(Snackbar.show, 1000, 'success', Locale.get('game', '_success'), Locale.get('game', '_done') + '<br>' + Locale.get('game', '_good_answers') + score['good_answers'] + '<br>' + Locale.get('game', '_fifty') + score['fifty'] + '<br>' + Locale.get('game', '_skip') + score['skip'] + '<br>' + Locale.get('game', '_score') + score['score'], true);
            setTimeout(clearInterval, 3000, interval);
        }
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
                .append($('<div>', {class: 'hint'}).append($('<img>', {
                    id: 'fiftyFifty',
                    src: Game.folder + '/5050.png'
                })))
                .append($('<div>', {class: 'hint'}).append($('<img>', {id: 'skip', src: Game.folder + '/skip.svg'}))))
        );

        gameArea.append($('<div>', {id: 'gameDiv'}));
    }

    putQuestionIntoDiv() {
        var question = this.gameObjects.questionObject;
        $('#questionBlock').text(Locale.get("questions", question.question));
        $('#0').text(Locale.get("questions", question.answers[0]));
        $('#1').text(Locale.get("questions", question.answers[1]));
        $('#2').text(Locale.get("questions", question.answers[2]));
        $('#3').text(Locale.get("questions", question.answers[3]));
    }

    static loadImages() {
        var getPath = function (i) {
            return Game.folder + QuizGame.gameImagePath.replace('%d', i);
        };
        var images = [Game.folder + "5050.png", Game.folder + "skip.svg"];
        for (var i = 1; i <= QuizGame.maxLevel; i++) {
            images.push(getPath(i));
        }

        images.forEach(function (entry) {
            var img = new Image;
            img.addEventListener('load', function () {
                Load.imageLoaded();
            });
            img.src = entry;
            img.style.display = "none";
            $('body').append(img);
        });
        return images.length;
    }

    changePictureOdGameDiv(id) {
        var selector = $("#gameDiv img");
        if (!selector[0])
            $('#gameDiv').append($('<img>', {
                class: "gameImage",
                src: Game.folder + QuizGame.gameImagePath.replace("%d", id)
            }));
        else (selector.attr("src", Game.folder + QuizGame.gameImagePath.replace("%d", id)))
    }

    getFinalStatistics() {
        var final = [];
        final['good_answers'] = (QuizGame.currentLevel - 1);
        final['fifty'] = (QuizGame.hintsUsed);
        final['skip'] = (QuizGame.maxNoOfSkips - QuizGame.skipsLeft);
        final['score'] = (final['good_answers'] - 0.5 * final['fifty'] - 1 * final['skip']);
        final['score'] = final['score'] >= 0 ? final['score'] : 0;
        return final
    }

    setCanClick() {
        QuizGame.canClick = true;
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
                        var score = GameManager.get().getFinalStatistics();
                        setTimeout(Snackbar.show, 1000, 'error', Locale.get('game', '_failure'), Locale.get('game', '_good_answers') + score['good_answers'] + '<br>' + Locale.get('game', '_fifty') + score['fifty'] + '<br>' + Locale.get('game', '_skip') + score['skip'] + '<br>' + Locale.get('game', '_score') + score['score'], true);
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
                    GameManager.set(QuizGame, 'game-area', true, false, false);
                }
            };
            Snackbar.addCallback(reset)
        });
    }
}
