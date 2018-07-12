class BasketGame extends Game {
    constructor(gameAreaId) {
        super(gameAreaId);

        this.basketHeight = 75; //percentage
        this.buttonText = Locale.get('game', '_button'); //text displayed on button
        this.buttonHeight = 50; //percentage

        this.horizontalOffset = 150;
        this.verticalOffset = 140;

        this.createBaskets(gameAreaId, this.basketHeight);
        this.createButton(gameAreaId, this.buttonText);

        this.gameObjects = [];

        for (var source_index in BasketGame.sources) {
            for (var entry_index in BasketGame.sources[source_index]) {
                var entry = BasketGame.sources[source_index][entry_index];
                if (entry.fileName) {
                    this.gameObjects.push(new BasketGameObject(entry.fileName, entry.display, entry.name, this));
                } else {
                    this.gameObjects.push(new BasketGameObject(null, entry.display, entry.name, this));
                }
            }
        }

        var shuffle = function (array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        var gameArea = this.getGameArea();
        var numberOfImages = this.gameObjects.length;

        var basketObject = this.gameObjects[0];
        this.maxWidth = Math.floor(gameArea.outerWidth(true) / this.horizontalOffset);
        this.offset = (gameArea.outerWidth(true) - ((Math.floor(this.maxWidth) - 1) * this.horizontalOffset + basketObject.object.outerWidth(true))) / 2;
        this.maxWidth = Math.ceil(numberOfImages / Math.ceil(numberOfImages / this.maxWidth));

        shuffle(this.gameObjects);

        for (var index in this.gameObjects) {
            this.move(this.gameObjects[index].object, index, this.maxWidth)
        }

        this.prepareButton();
    }

    move(item, i, maxWidth) {
        var gameArea = this.getGameArea();
        // translate the element
        i = parseInt(i);

        item.css('transform', 'translate(' + (this.offset + Math.ceil(((i + 1) % (maxWidth + 0.0001)) - 1) * Math.max(this.horizontalOffset, gameArea.outerWidth(true) / (this.maxWidth + 1))) + 'px, ' + (Math.ceil(((i + 1) / maxWidth) - 1) * this.verticalOffset) + 'px)');
        item.css('webkitTransform', item.css('transform'));

        // update the posiion attributes
        item.attr('data-y', Math.ceil(((i + 1) / maxWidth) - 1) * this.verticalOffset);
        item.attr('data-x', this.offset + Math.ceil(((i + 1) % (maxWidth + 0.0001)) - 1) * Math.max(this.horizontalOffset, gameArea.outerWidth(true) / (this.maxWidth + 1)));
    };

    prepareButton() {
        // Get the button that opens the modal
        var btn = document.getElementById("button");
        btn.onclick = function () {
            var ret = GameManager.get().checkWin();
            var score = (Math.round((ret[1] / ret[0]) * 100));
            score = score >= 0 ? score : 0;
            score += "%";
            if (ret[0] === ret[1])
                Snackbar.show("success", Locale.get('game', '_success') + Locale.get('game', '_score') + score, true);
            else
                Snackbar.show("error", Locale.get('game', '_failure') + Locale.get('game', '_score') + score, true);
        }
    }

    loadLocale() {
        this.gameObjects.forEach(function (entry) {
            if (!entry.file)
                entry.object.text(Locale.get('title', entry.display));
            else {
                var alt = entry.object[0].firstChild.alt;
                entry.object[0].firstChild.title = Locale.get('title', alt);
            }
        });
        $('#button')[0].value = Locale.get('game', '_button');
        jQuery('.dropzone').each(function (index, currentElement) {
            currentElement.firstChild.textContent = Locale.get('id', currentElement.id)
        });
    }

    checkWin() {
        var answers = [];
        var correctAnswers = 0;
        var matches = 0;
        $.each(GameManager.get().droppedList, function (basket, value) {
            $.each(value, function (x, value) {
                if (!answers[basket])
                    answers[basket] = [];
                if (value.firstChild.title)
                    answers[basket].push(value.firstChild.title);
                else answers[basket].push(value.innerHTML);
            });
        });
        $.each(BasketGame.sources, function (basket, value) {
            $.each(value, function (x, value) {
                if (value.name === 'GOOD')
                    correctAnswers++;
                if (answers[basket]) {
                    var index = answers[basket].indexOf(Locale.get('title', value.display));
                    if (index >= 0) {
                        if (value.name === 'GOOD') {
                            matches++;
                            answers[basket].splice(index, 1);
                        }
                    }
                }
            });
            if (answers[basket])
                matches = matches - answers[basket].length;
        });
        return [correctAnswers, matches];
    }

    createBaskets(id, height = null) {
        var coords = this.layoutBaskets();
        $.each(BasketGame.sources, function (basket, value) {
            $("#" + id).append($("<div>", {
                id: "basket-container" + basket,
                class: 'basket-container'
            }).append($("<div>", {
                class: "basket dropzone",
                style: "left: " + coords[basket] + "%" + (height === null ? '' : '; top: ' + height + '%'),
                id: basket
            }).append($('<div>', {class: 'basket-text text'}).append(Locale.get('id', basket)))));
        });
    }

    createButton(id, text) {
        $("#" + id).append($("<input>", {
            id: 'button',
            type: 'button',
            class: "button",
            value: text,
            style: "top: " + this.buttonHeight + '%'
        }))

    }

    layoutBaskets() {
        var coords = [];
        var iterator = 0;
        var length = Object.keys(BasketGame.sources).length;
        $.each(BasketGame.sources, function (basket, value) {
            coords[basket] = 100 / length + 100 / length * iterator - 100 / (length * 2);
            iterator++;
        });
        return coords;
    }

}

BasketGame
    .folder = 'img/';
BasketGame
    .sources = {
    '_worth': [
        {
            'display': '_citizen_kane',
            'name': 'GOOD',
        },
        {
            'display': '_vertigo',
            'name': 'GOOD',
        }
    ],
    '_not_worth': [
        {
            'display': '_la_regle_du_jeu',
            'name': 'GOOD',
        },
        {
            'display': '_2001_a_space_odyssey',
            'name': 'GOOD',
        },
        {
            'display': '_tokyo_monogatari',
            'name': 'GOOD'
        },
        {
            'fileName': "6.jpg",
            'display': "_otto_e_mezzo",
            'name': 'GOOD',
        },
        {
            'fileName': "7.jpg",
            'display': "_the_godfather",
            'name': 'GOOD'
        }
    ],
};