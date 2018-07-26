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
#### Basket:
Put words/ images into correct baskets.
Example config:
```json
{
    "alpha": {  //version of the game
        "basketHeight": 75, //percentage 
        "buttonHeight": 50, //percentage

        "horizontalOffset": 150, //for shuffling on screen
        "verticalOffset": 140, //for shuffling on screen
        "sources": {  
            "_yes":  //first basket name (to localize)
                [
                    {
                        "display": "_put", //first element name (to localize)
                        "name": "GOOD"  // GOOD = put in this basket, 
                        //BAD is used only to add elements with no matching basket
                    },
                    {
                        "fileName" : "1.jpg", //if fileName given, element will be image with src 1.jpg (in /img/ folder)
                        "display": "_put1",
                        "name": "BAD" //dont put into basket
                    }
                ],
            "_no": //second basket name (to localize)
                [
                    {
                        "display": "_dont",
                        "name": "GOOD"
                    }
                ],
            "_maybe": //third basket name (to localize) can add more baskets 
            [
                {
                    "display": "_maybe",
                    "name": "GOOD"
                }
            ]
        }
    }
}
```
Other things such as button text, after loading text etc can be changed in locale.js

#### Quiz:
Goal is to answer 15x correct, hints such as 50/50 and skip question (2x per game) give minus points
Example config: <br>
Number of questions per difficulty must be at least 8! (5 + skips)
```json
{
    "alpha": { //version of the game
        "sources": {
            "easy": { //difficulty
                "football": [  // category
                    {
                        "question": "#question_football", //question (to localize)
                        "answers": [  //answers (to localize)
                            "#answer_football_0",
                            "#answer_football_1", 
                            "#answer_football_2",
                            "#answer_football_3"
                        ],
                        "correctAnswer": "1" //indexing from 0
                    },
                     {
                        "question": "#question_football", //question (to localize)
                        "answers": [  //answers (to localize)
                             "#answer_football_0",
                             "#answer_football_1", 
                             "#answer_football_2",
                             "#answer_football_3"
                        ],
                        "correctAnswer": "1" //indexing from 0
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
Other things such as after loading text, loading text etc can be changed in locale.js
#### Sort:
Swap letters to make correct words.
Example config:
```json
{
    "alpha": {
        "sources": [    //phrases (to localize)
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
Find words and highlight them by mouse drag (from begin of the word to end / reverse)
Example config:
```json
{
    "animals": {
        "sources": [  //words (to localize)
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
        "width": 11,  //min width of area
        "height": 8   //min height of area
    }
}
```