BasketGame.versions = {
    "alpha": {  //version of the game
        "basketHeight": 75, //percentage
        "buttonHeight": 50, //percentage

        "horizontalOffset": 150, //for shuffling on screen
        "verticalOffset": 140, //for shuffling on screen
        "sources": {
            "_worth":  //first basket name (to localize)
                [
                    {
                        "display": "_put", //first element name (to localize)
                        "name": "GOOD"  // GOOD = put in this basket,
                        //BAD is used only to add elements with no matching basket
                    },
                    {
                        "fileName": "1.jpg", //if fileName given, element will be image with src 1.jpg (in /img/ folder)
                        "display": "_put1",
                        "name": "BAD" //dont put into basket
                    }
                ],
            "_not_worth": //second basket name (to localize)
                [
                    {
                        "fileName": "2.jpg", //if fileName given, element will be image with src 1.jpg (in /img/ folder)
                        "display": "_put1",
                        "name": "GOOD" //dont put into basket
                    },
                    {
                        "fileName": "3.jpg", //if fileName given, element will be image with src 1.jpg (in /img/ folder)
                        "display": "_put1",
                        "name": "GOOD" //dont put into basket
                    },
                    {
                        "fileName": "4.jpg", //if fileName given, element will be image with src 1.jpg (in /img/ folder)
                        "display": "_put1",
                        "name": "GOOD" //dont put into basket
                    }
                ],
            "_empty": //third basket name (to localize) can add more baskets
                [
                    {
                        "display": "_dont",
                        "name": "BAD"
                    }
                ]
        }
    }
};