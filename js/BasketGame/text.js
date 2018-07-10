class BasketGameObject {
    constructor(file, val, name, id) {
        this.id = id;
        this.display = val;
        this.object = this.createObject(file, this.display);
        $("#" + id).append(this.object);
    }

    static setData(id) {
        this.createBaskets(id, BasketGameObject.basketHeight);
        this.createButton(id, BasketGameObject.buttonText);

        BasketGameObject.objects = [];


        $.each(BasketGameObject.sources, function (i, val) {

            $.each(val, function (i, val) {
                if (val.fileName) {
                    BasketGameObject.objects.push(new BasketGameObject(val.fileName, val.display, val.name, id));
                } else {
                    BasketGameObject.objects.push(new BasketGameObject(null, val.display, val.name, id));
                }
            });
        });

        var shuffle = function (array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        var gameArea = $('#' + BasketGameObject.objects[0].id);
        var numberOfImages = BasketGameObject.objects.length;


        var getDimensions = function (imageObject) {
            BasketGameObject.maxWidth = Math.floor(gameArea.outerWidth(true) / BasketGameObject.horizontalOffset);
            BasketGameObject.offset = (gameArea.outerWidth(true) - ((Math.floor(BasketGameObject.maxWidth) - 1) * BasketGameObject.horizontalOffset + imageObject.object.outerHeight(true))) / 2;
            BasketGameObject.maxWidth = Math.ceil(numberOfImages / Math.ceil(numberOfImages / BasketGameObject.maxWidth));
        };
        getDimensions(BasketGameObject.objects[0]);

        var move = function (item, i, maxHeight) {
            // translate the element
            item.css('transform', 'translate(' + (BasketGameObject.offset + Math.ceil(((i + 1) % (maxHeight + 0.0001)) - 1) * Math.max(BasketGameObject.horizontalOffset, gameArea.outerHeight(true) / (BasketGameObject.maxWidth + 1))) + 'px, ' + (Math.ceil(((i + 1) / maxHeight) - 1) * BasketGameObject.verticalOffset) + 'px)');
            item.css('webkitTransform', item.css('transform'));

            // update the posiion attributes
            item.attr('data-y', Math.ceil(((i + 1) / maxHeight) - 1) * BasketGameObject.verticalOffset);
            item.attr('data-x', BasketGameObject.offset + Math.ceil(((i + 1) % (maxHeight + 0.0001)) - 1) * Math.max(BasketGameObject.horizontalOffset, gameArea.outerHeight(true) / (BasketGameObject.maxWidth + 1)));
        };

        shuffle(BasketGameObject.objects);
        BasketGameObject.objects.forEach(function (entry, i) {
            move(entry.object, i, BasketGameObject.maxWidth);
        });

        prepareModal();
        this.prepareButton()
    }

    static prepareButton() {
        // Get the button that opens the modal
        var btn = document.getElementById("button");
        btn.onclick = function () {
            modal.style.display = "block";
            if (BasketGameObject.checkWin())
                showMessage("success", BasketGameObject.successMessage);
            else
                showMessage("error", BasketGameObject.failureMessage);
        }
    }

    static checkWin() {
        var answers = [];
        var correctAnswers = 0;
        var matches = 0;
        $.each(BasketGameObject.droppedList, function (basket, value) {
            $.each(value, function (x, value) {
                if (!answers[basket])
                    answers[basket] = [];
                if (value.firstChild.alt)
                    answers[basket].push(value.firstChild.alt);
                else answers[basket].push(value.innerHTML);
            });
        });
        $.each(BasketGameObject.sources, function (basket, value) {
            $.each(value, function (x, value) {
                if (value.name === 'GOOD')
                    correctAnswers++;
                if (answers[basket]) {
                    var index = answers[basket].indexOf(value.display);
                    if (index >= 0) {
                        if (value.name === 'BAD')
                            matches--;
                        else {
                            matches++;
                            answers[basket].splice(index, 1);
                        }
                    }
                }
            });
            if (answers[basket])
                matches = matches - answers[basket].length;
        });
        return correctAnswers === matches;
    }


    static drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    static createBaskets(id, height = null) {
        var coords = this.layoutBaskets();
        $.each(BasketGameObject.sources, function (basket, value) {
            $("#" + id).append($("<div>", {
                id: "basket-container" + basket,
                class: 'basket-container'
            }).append($("<div>", {
                class: "basket dropzone",
                style: "left: " + coords[basket] + "%" + (height === null ? '' : '; top: ' + height + '%'),
                id: basket
            }).append($('<div>', {class: 'basket-text text'}).append(basket))));
        });
    }

    static createButton(id, text) {
        $("#" + id).append($("<input>", {
            id: 'button',
            type: 'button',
            class: "button",
            value: text,
            style: "top: " + BasketGameObject.buttonHeight + '%'
        }))

    }

    static layoutBaskets() {
        var coords = [];
        var iterator = 0;
        var length = Object.keys(BasketGameObject.sources).length;
        $.each(BasketGameObject.sources, function (basket, value) {
            coords[basket] = 100 / length + 100 / length * iterator - 100 / (length * 2);
            iterator++;
        });
        return coords;
    }

    createObject(src, display) {
        if (src)
            return $("<div>", {class: "draggable left yes-drop image"}).append($("<img>", {
                src: BasketGameObject.folder + src,
                title: display,
                alt: display
            }));
        return $("<div>", {class: "draggable left yes-drop text title"}).append(display);
    }
}

BasketGameObject
    .basketHeight = 75; //percentage

BasketGameObject
    .buttonText = "Przycisk"; //text displayed on button
BasketGameObject
    .buttonHeight = 50; //percentage

BasketGameObject.horizontalOffset = 100;
BasketGameObject.verticalOffset = 100;

BasketGameObject
    .folder = 'img/';
BasketGameObject
    .sources = {
    'Te napisy, co chca byc wrzucone': [
        {
            'display': 'To wrzuć',
            'name': 'GOOD',
        },
        {
            'display': 'To też',
            'name': 'GOOD',
        }
    ],
    'Wrzuć tu obrazki': [
        {
            'display': 'Tego nie',
            'name': 'BAD',
        },
        {
            'display': 'Tego też nie',
            'name': 'BAD',
        },
        {
            'display': 'Ani tego',
            'name': 'BAD'
        },
        {
            'fileName': "1.jpg",
            'display': "Obrazek 1",
            'name': 'GOOD',
        }
    ],
    "Co lubi Wojtek?": [
        {
            'display': 'BROK',
            'name': 'GOOD'
        },
        {
            'display': 'SLODKIE JAK PIJE ALKO',
            'name': 'BAD'
        },
        {
            'display': "POLENG",
            'name': 'BAD'
        }
    ]
};

BasketGameObject.welcomeMessage = "Witaj podróżniku, powrzucaj prawidłowo obrazki i napisy do koszyków przeciągając je na te koszyki. Powodzenia!";
BasketGameObject.successMessage = "Brawo!";
BasketGameObject.failureMessage = "Nie udało się, zastanów się co wrzuciłeś żle.";