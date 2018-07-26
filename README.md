# Drag-and-drop-Game
##### html5, js+jquery game
### Deploy
Install javascript-obfuscator
```sh
$ npm install --save-dev javascript-obfuscator
```
Run deploy script specifying type of the game
```sh
$ ./deploy.sh [hangman|quiz|pair|basket|crossword|memo|puzzle|sort]
```

### Config
Localize phrases in config/GameName/locale.js
#### Basket:
Put objects into the correct baskets.
Example config:
```js
{
    "alpha": {  //Game version
        "basketHeight": 75, //percentage 
        "buttonHeight": 50, //percentage

        "horizontalOffset": 150, //Distance between shuffled objects
        "verticalOffset": 140, //Distance between shuffled objects
        "sources": {  
            "_yes":  //first basket name (not localized)
                [
                    {
                        "display": "_put", //first element name (not localized)
                        "name": "GOOD"  // GOOD element to be put in this basket, 
                            //BAD is used to add elements with no matching basket
                    },
                    {
                        "fileName" : "1.jpg", //if fileName is set, element will be an image got from ./img/fileName
                        "display": "_put1",
                        "name": "BAD" // element with no matching basket
                    }
                ],
            "_no": //second basket name (not localized)
                [
                    {
                        "display": "_dont",
                        "name": "GOOD"
                    }
                ],
            "_maybe": //third basket name (not localized)
                [
                    {
                        "display": "_maybe",
                        "name": "GOOD"
                    }
                ]
            // Additional baskets can be added
        }
    }
}
```
#### Quiz:
The goal of the game is to answer correctly for 15 questions, usage of any hints such as "50/50" and "skip question" (availble 2 times per game) give negative points
Example config: <br>
It is necessary to provide at least 8 questions per difficulty level (5 + possible skipped questions)
```js
{
    "alpha": { //game version
        "sources": {
            "easy": { //difficulty level
                "football": [  // category
                    {
                        "question": "#question_football", //question (not localized)
                        "answers": [  //4 answers (not localized)
                            "#answer_football_0",
                            "#answer_football_1", 
                            "#answer_football_2",
                            "#answer_football_3"
                        ],
                        "correctAnswer": "1" //questions are numbered 0-3
                    },
                     {
                        "question": "#question_football", //question (not localized)
                        "answers": [  //answers (not localized)
                             "#answer_football_0",
                             "#answer_football_1", 
                             "#answer_football_2",
                             "#answer_football_3"
                        ],
                        "correctAnswer": "1" //questions are numbered 0-3
                    }
                ],
                "maths": [
                     {
                        "question": "#question1",
                        "answers": [
                            "#answer_1_0",
                            "#answer_1_1",
                            "#answer_1_2",
                            "#answer_1_3"
                        ],
                        "correctAnswer": "0"
                     }
                ]
            },
            "medium": {
                "category": [
                     {
                     }
                ]
            },
            "hard": {
                "category": [
                    {
                    }
                ]
            }
        }
    }
}
```
#### Sort:
Swap letters to make correct words.
Example config:
```js
{
    "alpha": {
        "sources": [    //phrases (not localized)
            "_citizen_kane",
            "_vertigo",
            "_la_regle_du_jeu",
            "_2001_a_space_odyssey",
            "_tokyo_monogatari",
            "_otto_e_mezzo",
            "_the_godfather",
            "_sunrise_a_song_of_two_humans",
            "_the_searchers",
            "_shichinin_no_samurai"
        ]
    }
}
```
#### Puzzle
Find words in a puzzle and highlight them by mouse drag (from beginning of the word to its end). Words can be reversed!
Example config:
```js
{
    "animals": {
        "sources": [  /*words (not localized)*/
            "_animal1",
            "_animal2",
            "_animal3",
            "_animal4",
            "_animal5",
            "_animal6",
            "_animal7",
            "_animal8",
            "_animal9",
            "_animal10",
            "_animal11"
        ],
        "width": 11,  //min width 
        "height": 8   //min height
    }
}
```
#### Pair
Match images to definitions
Example config:
```js
{
    "alpha": {
        "horizontalOffset": 140, //Distance between shuffled objects
        "verticalOffset": 80,//Distance between shuffled objects
        "sources": [
            {
                "fileName": "1.jpg", //an image got from ./img/fileName
                "title": "_citizen_kane" //title matching with an image (not localized)
            },
            {
                "fileName": "2.jpg",
                "title": "_vertigo",
            }
        ]
    }
}
```
#### Hangman
Guess the phrase with x mistakes allowed
Example config:
```js
{
 "beta": {
        "numberOfAcceptableMistakes": 2,
        "sources": [  //phrases (not localized)
            "_citizen_kane",
            "_vertigo",
            "_la_regle_du_jeu",
            "_2001_a_space_odyssey",
            "_tokyo_monogatari",
            "_otto_e_mezzo",
        ]
    }
}
```
#### Memo
Memo game, match images to their definitions
Example config:
```js
{
    "alpha": {
        "sources": [
            {
                "fileName": "1.jpg", //an image got from ./img/fileName
                "title": "_citizen_kane" //title matching with an image (not localized)
            },
            {
                "fileName": "2.jpg",
                "title": "_vertigo",
            }
        ]
    }
}
```
#### Crossword
Crossword game, guess the phrases to solve the crossword
Due to the not translatable nature of the crosswords phrases are localized directly in config
Example config:
```js
{
    "crossword": {
        "crosswords": {
            "pl": { //Locale version
                "Film crossword": [
                    {
                        "definition" : "Film z 1941",
                        "word": "Obywatel Kane",
                        "solutionLetter": 3
                    },
                    {
                        "definition" : "Film z 1958",
                        "word": "Zawrót głowy",
                        "solutionLetter": 5
                    },
                ]
            },
            "en": {
                "Film crossword": [
                    {
                        "definition" : "Movie from 1941", //definition
                        "word": "Citizen Kane", //word
                        "solutionLetter": 3 //solution letter (indexing from 1!)
                    },
                    {
                         "definition" : "Movie from 1958",
                         "word": "Vertigo",
                         "solutionLetter": 5
                    }, 
                ]
            }
        }
    }
}
```
