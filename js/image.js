class ImageGameObject {
    constructor(val, name, id) {
        this.val = ImageGameObject.folder + val;
        this.name = name;
        this.image = $("#" + id).append(this.createImage(this.val));
        this.title = $("#" + id).append(this.createTitle(this.name));
    }

    createImage(src){
        return $("<img>", {src: src});
    }

    createTitle(text){
        return $("<div>",{class: "draggable", html: text} );
    }
    
    static setData(id) {
        ImageGameObject.images = [];
        ImageGameObject.sources.forEach(function (entry) {
            if(entry.fileName.match(/\.(jpe?g|png|gif)$/) ) { 
                var image = new ImageGameObject(entry.fileName, entry.title, id);
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
