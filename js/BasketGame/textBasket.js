class BasketGameObject {
    constructor(file, val, name, id) {
        this.file = ImageGameObject.folder + file;
        this.display = val;
        this.name = name;
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

            var shuffle = function (array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            };

            shuffle(BasketGameObject.objects);
            BasketGameObject.objects.forEach(function (entry, i) {
                entry.move(entry.object[0], i);
            });
        });
    }

    static checkWin() {
        var answers = [];
        var correctAnswers = 0;
        var matches = 0;
        $.each(BasketGameObject.droppedList, function (basket, value) {
            $.each(value, function (x, value) {
                if (!answers[basket])
                    answers[basket] = [];
                answers[basket].push(value.firstChild.alt);
            });
        });
        $.each(BasketGameObject.sources, function (basket, value) {
            $.each(value, function (x, value) {
                if (value.name === 'GOOD')
                    correctAnswers++;
                if (answers[basket] && answers[basket].indexOf(value.display) >= 0) {
                    if (value.name === 'BAD')
                        matches--;
                    else
                        matches++;
                }
            });
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
                class: "basket dropzone",
                style: "left: " + coords[basket] + "%" + (height === null ? '' : '; top: ' + height + '%'),
                id: basket
            }));
        });
    }

    move(item, i) {
        // translate the element
        item.style.webkitTransform =
            item.style.transform =
                'translate(0px, ' + i * 100 + 'px)';

        // update the posiion attributes
        item.setAttribute('data-x', 0);
        item.setAttribute('data-y', i * 100);
    }

    static createButton(id, text) {
        $("#" + id).append($("<input>", {
            id: 'button',
            type: 'button',
            class: "button",
            value: text
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
            return $("<div>", {class: "draggable left yes-drop"}).append($("<img>", {
                src: ImageGameObject.folder + src,
                title: display,
                alt: display
            }));
        return $("<div>", {class: "draggable left yes-drop text"}).append($("<img>", {
            title: display,
            alt: display
        }));
    }
}

BasketGameObject
    .basketHeight = 75;

BasketGameObject
    .buttonText = "Przycisk";

BasketGameObject
    .folder = 'img/';
BasketGameObject
    .sources = {
    '1': [
        {
            'display': 'To wrzuć',
            'name': 'GOOD',
        },
        {
            'display': 'To też',
            'name': 'GOOD',
        }
    ],
    '2': [
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
    '3': [
        {
            'display': 'LOL',
            'name': 'GOOD'
        }
    ]
};
