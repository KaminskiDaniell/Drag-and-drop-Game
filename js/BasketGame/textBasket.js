class TextGameObject {
    constructor(file, val, name, id) {
        this.file = ImageGameObject.folder + file;
        this.display = val;
        this.name = name;
        this.object = this.createObject(this.file, this.display);
        $("#" + id).append(this.object);
    }

    static setData(id) {
        TextGameObject.objects = [];
        TextGameObject.sources.forEach(function (entry, i) {
            if (entry.fileName) {
                TextGameObject.objects.push(new TextGameObject(entry.fileName, entry.display, entry.name, id));
            } else {
                TextGameObject.objects.push(new TextGameObject(null, entry.display, entry.name, id));
            }
        });

        var shuffle = function (array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        shuffle(TextGameObject.objects);
        TextGameObject.objects.forEach(function (entry, i) {
            entry.move(entry.object[0], i);
        });
    }

    static checkWin(list) {
        var answers = [];
        $.each(list, function (index, value) {
            answers.push(value.firstChild.title)
        });
        var matches = 0;
        this.sources.forEach(function (entry) {
            if (answers.indexOf(entry.display) >= 0) {
                console.log(entry.name);
                if (entry.name === 'BAD')
                    matches--;
                else
                    matches++;
            }
        });
        console.log(matches === this.countGoodAnswers);
        return matches === this.countGoodAnswers;

    }

    static drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    createObject(src, display) {
        return $("<div>", {class: "draggable left yes-drop text"}).append($("<img>", {
            src: src,
            title: display,
            alt: display
        }));
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

}

TextGameObject.folder = 'img/';
TextGameObject.countGoodAnswers = 3;
TextGameObject.sources = [
    {
        'display': 'To wrzuć',
        'name': 'GOOD'
    },
    {
        'display': 'To też',
        'name': 'GOOD',
    },
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
        'name': 'GOOD'
    }
];
