class TextGameObject {
    constructor(val, name, id) {
        this.display = val;
        this.name = name;
        this.object = this.createObject(this.display);
        $("#" + id).append(this.object);
    }

    static setData(id) {
        TextGameObject.objects = [];
        TextGameObject.sources.forEach(function (entry, i) {
            if (entry.display) {
                TextGameObject.objects.push(new TextGameObject(entry.display, entry.name, id));
            }
        });

        var shuffle = function (array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffle(TextGameObject.objects);
        TextGameObject.objects.forEach(function (entry, i) {
            entry.move(entry.object[0], i);
        });
    }

    static drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    createObject(display) {
        return $("<div>", {class: "draggable left yes-drop text"}).append(display);
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
TextGameObject.goodSources = 2;
TextGameObject.sources = [
    {
        'display': 'To wrzuć',
        'name': 'GOOD1'
    },
    {
        'display': 'To też',
        'name': 'GOOD2',
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
    }
];
