class QuizGameObject extends GameObject {
    constructor(level, game) {
        super(game);
        this.questionObject = this.draw(level);

    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    draw(level) {
        var difficultyLevel;
        if (level > 10)
            difficultyLevel = 'hard';
        else if (level > 5) {
            difficultyLevel = 'medium'
        }
        else
            difficultyLevel = 'easy';
        var categories = this.getCategoriesByDifficulty(difficultyLevel);
        var questions = this.drawCategory(categories);
        return this.drawQuestion(questions)
    }

    getCategoriesByDifficulty(difficulty) {
        this.difficulty = difficulty;
        return QuizGame.sources[difficulty]
    }

    drawCategory(categories) {
        var categoriesArray = Object.keys(categories);
        var categoryCount = categoriesArray.length;
        this.category = Math.floor((Math.random() * categoryCount));
        return categories[categoriesArray[this.category]]
    }

    drawQuestion(questions) {
        var questionArray = Object.keys(questions);
        var questionCount = questionArray.length;
        this.question = Math.floor((Math.random() * questionCount));
        return questions[questionArray[this.question]];
    }
}

