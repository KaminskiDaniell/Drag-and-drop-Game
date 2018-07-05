class ImageGameObject {
    constructor(val, name, id) {
        this.val = ImageGameObject.folder + val;
        this.name = name;
        this.image = this.createImage(this.val, this.name);
        $("#" + id).append(this.image);
    }

    static setData(id) {
        ImageGameObject.images = [];
        ImageGameObject.sources.forEach(function (entry, i) {
            if (entry.fileName.match(/\.(jpe?g|png|gif)$/)) {
                ImageGameObject.images.push(new ImageGameObject(entry.fileName, entry.name, id));
            }
        });

        var shuffle = function (array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffle(ImageGameObject.images);
        ImageGameObject.images.forEach(function (entry, i) {
            entry.move(entry.image[0], i);
        });
    }

    static drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    createImage(src, name) {
        return $("<div>", {class: "draggable left yes-drop"}).append($("<img>", {src: src, title: name}));
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

ImageGameObject.folder = 'img/';
ImageGameObject.sources = [
    {
        'fileName': '1.jpg',
        'name': 'Citizen Kane (1941)'
    },
    {
        'fileName': '2.jpg',
        'name': 'Vertigo (1958)',
    },
    {
        'fileName': '3.jpg',
        'name': 'La Règle du jeu (1939)',
    },
    {
        'fileName': '4.jpg',
        'name': '2001: A Space Odyssey (1968)',
    },
    {
        'fileName': '5.jpg',
        'name': 'Tokyo monogatari (1953)'
    }
];
