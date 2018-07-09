class ImageGameObject {
    constructor(val, name, id) {
        this.id = id;
        this.val = ImageGameObject.folder + val;
        this.name = name;
        this.image = this.createImage(this.val);
        this.title = this.createTitle(this.name);
        this.matched = false;
        $("#" + id).append(this.image);
        $("#" + id).append(this.title);
    }

    createImage(src){
        return $("<div>", {class: "image draggable left yes-drop dropzone"}).append($("<img>", {src: src, alt: src}));
    }

    createTitle(text){
        return $("<div>", {class: "title draggable right yes-drop dropzone"}).append($("<img>", {alt: text}));
    }

    markAsMatched() {
        if(++ImageGameObject.matched == ImageGameObject.imageObjects.length){
            showMessage('success', 'Brawo!');
        }
        this.title.remove();
        this.image.append(this.title.children('img'));
        this.image.removeClass('dragged-in');
        this.image.removeClass('dropzone');
        this.image.removeClass('yes-drop');
    }
    
    static setData(id) {
        ImageGameObject.imageObjects = [];
        ImageGameObject.zIndex = 0;
        ImageGameObject.matched = 0;
        ImageGameObject.sources.forEach(function (entry, i) {
            if(entry.fileName.match(/\.(jpe?g|png|gif)$/) ) { 
                ImageGameObject.imageObjects.push(new ImageGameObject(entry.fileName, entry.title, id));
            } 
        });

        var shuffle = function(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        var getDimensions = function(imageObject) {
            var gameArea = $('#' + imageObject.id);
            ImageGameObject.maxHeight = gameArea.outerHeight(true) / ImageGameObject.verticalOffset;
            ImageGameObject.offset = (gameArea.outerHeight(true) - ((Math.floor(ImageGameObject.maxHeight) - 1) * ImageGameObject.verticalOffset + imageObject.image.outerHeight(true))) / 2;
        }
        getDimensions(ImageGameObject.imageObjects[0]);

        var move = function(item, i, maxHeight) {
            var sign = item.hasClass('right') ? -1 : 1;
            // translate the element
            item.css('transform', 'translate(' + sign * Math.ceil(((i + 1) / maxHeight) - 1) * ImageGameObject.horizontalOffset + 'px, ' + (ImageGameObject.offset + Math.ceil(((i + 1) % maxHeight) - 1) * ImageGameObject.verticalOffset) + 'px)');
            item.css('webkitTransform', item.css('transform'));

            // update the posiion attributes
            item.attr('data-x', sign * Math.ceil(((i + 1) / maxHeight) - 1) * ImageGameObject.horizontalOffset);
            item.attr('data-y', ImageGameObject.offset + Math.ceil(((i + 1) % (maxHeight + 0.0001)) - 1) * ImageGameObject.verticalOffset);
        }

        shuffle(ImageGameObject.imageObjects);
        ImageGameObject.imageObjects.forEach(function (entry, i) {
            move(entry.image, i, ImageGameObject.maxHeight);
        });
        shuffle(ImageGameObject.imageObjects);
        ImageGameObject.imageObjects.forEach(function (entry, i) {
            move(entry.title, i, ImageGameObject.maxHeight);
        });
    }

    static match(element1, element2) {
        for(var i = 0; i < ImageGameObject.imageObjects.length; i++) {
            var entry = ImageGameObject.imageObjects[i];
            if((entry.image[0] === element1 && entry.title[0] === element2) || (entry.image[0] === element2 && entry.title[0] === element1)){
                entry.markAsMatched();
                return true;
            }
        }
        return false;
    }
    
    static drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    static getZIndex() {
        return ++ImageGameObject.zIndex;
    }
}

ImageGameObject.horizontalOffset = 140;
ImageGameObject.verticalOffset = 80;

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
