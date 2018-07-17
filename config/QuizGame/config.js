// NUMBER OF TOTAL QUESTION PER DIFFICULTY LEVEL MUST BE AT LEAST 8!
QuizGame.gameImagePath = "QuizGame/stage-%d.png";
QuizGame.maxLevel = 15;
QuizGame.sources = {
    'easy': {
        'bla': [
            {
                question: "#question_wojtek",
                answers: [
                    "#answer_wojtek_0",
                    "#answer_wojtek_1",
                    "#answer_wojtek_2",
                    "#answer_wojtek_3"
                ],
                correctAnswer: '0'
            },
            {
                question: "#question_football",
                answers: [
                    "#answer_football_0",
                    "#answer_football_1",
                    "#answer_football_2",
                    "#answer_football_3"
                ],
                correctAnswer: '1'
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
        'piosenki': [
            {
                question: "... miś dla dziewczyny, która kocham ... Jakiego koloru jest ten miś",
                answers: [
                    "Brązowego",
                    "Czarnego",
                    "Białego",
                    "Złotego"
                ],
                correctAnswer: '2'
            },
            {
                question: "Ile jest 2 + 2",
                answers: [
                    "4",
                    "5",
                    "3",
                    "4.5"
                ],
                correctAnswer: '0'
            },
            {
                question: "Ile jest 2 - 2",
                answers: [
                    "0",
                    "2",
                    "-1",
                    "3"
                ],
                correctAnswer: '0'
            },
            {
                question: "Ile jest 2 + 3 * 2",
                answers: [
                    "8",
                    "10",
                    "6",
                    "nie można jednocześnie mnożyć i dodawać"
                ],
                correctAnswer: '0'
            },
        ],
        'fizyka': [
            {
                question: "Do czego odnosi się rok świetlny",
                answers: [
                    "Czasu",
                    "Szybkości",
                    "Długości",
                    "Przyśpieszenia"
                ],
                correctAnswer: '2'
            },
            {
                question: "Czego stolicą jest Londyn",
                answers: [
                    "Irlandii",
                    "Wielkiej Brytani",
                    "Stanów zjednoczonych",
                    "Polonii"
                ],
                correctAnswer: '1'
            },
            {
                question: "Co jest stolicą województwa wielkopolskiego?",
                answers: [
                    "Warszawa",
                    "Gniezno",
                    "Manhatan",
                    "Poznań"
                ],
                correctAnswer: '3'
            }
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
            {
                question: "hard Question 2 category 1",
                answers: [
                    "BAD",
                    "BAD",
                    "GOOD",
                    "BAD"
                ],
                correctAnswer: '2'
            },
            {
                question: "hard Question 3 category 1",
                answers: [
                    "BAD",
                    "BAD",
                    "GOOD",
                    "BAD"
                ],
                correctAnswer: '2'
            },
            {
                question: "hard Question 4 category 1",
                answers: [
                    "BAD",
                    "BAD",
                    "GOOD",
                    "BAD"
                ],
                correctAnswer: '2'
            },
            {
                question: "hard Question 5 category 1",
                answers: [
                    "BAD",
                    "BAD",
                    "GOOD",
                    "BAD"
                ],
                correctAnswer: '2'
            },
            {
                question: "hard Question 6 category 1",
                answers: [
                    "BAD",
                    "BAD",
                    "GOOD",
                    "BAD"
                ],
                correctAnswer: '2'
            },
            {
                question: "hard Question 7 category 1",
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