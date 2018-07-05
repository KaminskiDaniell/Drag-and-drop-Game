class ImageGameObject {
    constructor(val, name, id, i) {
        this.val = ImageGameObject.folder + val;
        this.name = name;
        this.image = $("#" + id).append(this.createImage(this.val));
        this.title = $("#" + id).append(this.createTitle(this.name));
    }

    createImage(src){
        return $("<div>", {class: "draggable left yes-drop"}).append($("<img>", {src: src}));
    }

    createTitle(text){
        return $("<div>", {class: "draggable right yes-drop", html: text});
    }
    
    static setData(id) {
        ImageGameObject.images = [];
        var shuffle = function(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffle(ImageGameObject.sources);

        ImageGameObject.sources.forEach(function (entry, i) {
            if(entry.fileName.match(/\.(jpe?g|png|gif)$/) ) { 
                var image = new ImageGameObject(entry.fileName, entry.title, id, i);
                ImageGameObject.images.push(image);
            } 
        });
    }
    
    static drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

}

ImageGameObject.folder = 'img/';
ImageGameObject.sources = [
    {
        'fileName': '1.jpg',
        'title': 'Citizen Kane (1941)'
    },
    {
        'fileName': '2.jpg',
        'title' : 'Vertigo (1958)',
    },
    {
        'fileName': '3.jpg',
        'title': 'La Règle du jeu (1939)',
    },
    {
        'fileName': '4.jpg',
        'title': '2001: A Space Odyssey (1968)',
    },
    {
        'fileName': '5.jpg',
        'title': 'Tokyo monogatari (1953)'
    },
    {
        'fileName': '6.jpg',
        'title': 'Otto e mezzo (1963)'
    },
    {
        'fileName': '7.jpg',
        'title': 'The Godfather (1972)'
    },
    {
        'fileName': '8.jpg',
        'title': 'Sunrise: A Song of Two Humans (1927)'
    },
    {
        'fileName': '9.jpg',
        'title': 'The Searchers (1956)'
    },
    {
        'fileName': '10.jpg',
        'title': 'Shichinin no samurai (1954)'
    },
];
