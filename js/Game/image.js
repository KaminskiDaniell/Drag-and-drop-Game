class ImageGameObject {
    constructor(val, name, id, gameAreaId) {
        this.id = id;
        this.gameAreaId = gameAreaId;
        this.val = ImageGameObject.folder + val;
        this.name = name;
        this.image = this.createImage(id, this.val);
        this.title = this.createTitle(id, this.name);
        this.matched = false;
        $("#" + gameAreaId).append(this.image);
        $("#" + gameAreaId).append(this.title);
    }

    createImage(id, src){
        return $("<div>", {id: id + '-image' , class: "image draggable left yes-drop dropzone"}).append($("<img>", {src: src, alt: src}));
    }

    createTitle(id, text){
        return $("<div>", {id: id + '-title', class: "title draggable right yes-drop dropzone"}).append($("<div>").append(text));
    }

    markAsMatched() {
        if(++ImageGameObject.matched == ImageGameObject.imageObjects.length){
            clearInterval(ImageGameObject.timeInterval);
            modal.style.display = "block";
            showMessage('success', 'Brawo!');
        }
        ImageGameObject.addScore();
        this.title.remove();
        this.image.append(this.title.children("div"));
        this.image.removeClass('dragged-in');
        this.image.removeClass('dropzone');
        this.image.removeClass('yes-drop');
    }

    static setTimer(gameAreaId) {
        if(!ImageGameObject.timeInterval) {
            var start = new Date;
            var timer = $('<div>', {class : 'timer left'}).append('0');
            $('#' + gameAreaId).append(timer);

            ImageGameObject.timeInterval = setInterval(function() {
                timer.text(parseInt((new Date - start) / 1000));
            }, 1000);
        }
    }

    static setScores(gameAreaId) {
        if(!ImageGameObject.scores) {
            ImageGameObject.scores = $('<div>', {class : 'scores right'}).append('0');
            $('#' + gameAreaId).append(ImageGameObject.scores);
        }
    }

    static addScore() {
        ImageGameObject.scores.text(ImageGameObject.matched);
    }
    
    static setData(gameAreaId) {
        ImageGameObject.imageObjects = [];
        ImageGameObject.zIndex = 0;
        ImageGameObject.matched = 0;

        var gameArea = $('#' + gameAreaId);
        

        ImageGameObject.sources.forEach(function (entry, i) {
            if(entry.fileName.match(/\.(jpe?g|png|gif)$/) ) { 
                ImageGameObject.imageObjects.push(new ImageGameObject(entry.fileName, entry.title, i, gameAreaId));
            } 
        });

        var shuffle = function(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        var numberOfImages = ImageGameObject.imageObjects.length;

        var getDimensions = function(imageObject) {
            ImageGameObject.maxHeight = Math.floor(gameArea.outerHeight(true) / ImageGameObject.verticalOffset);
            ImageGameObject.offset = (gameArea.outerHeight(true) - ((Math.floor(ImageGameObject.maxHeight) - 1) * ImageGameObject.verticalOffset + imageObject.image.outerHeight(true))) / 2;
            ImageGameObject.maxHeight = Math.ceil(numberOfImages / Math.ceil(numberOfImages / ImageGameObject.maxHeight));
        }
        getDimensions(ImageGameObject.imageObjects[0]);

        var move = function(item, i, maxHeight) {
            var sign = item.hasClass('right') ? -1 : 1;
            var x = sign * Math.ceil(((i + 1) / maxHeight) - 1) * ImageGameObject.horizontalOffset;
            var y = ImageGameObject.offset + Math.ceil(((i + 1) % (maxHeight + 0.0001)) - 1) * Math.max(ImageGameObject.verticalOffset, gameArea.outerHeight(true) / (ImageGameObject.maxHeight + 1));
            // translate the element
            item.css('transform', 'translate(' + x + 'px, ' + y + 'px)');
            item.css('webkitTransform', item.css('transform'));

            // update the posiion attributes
            item.attr('data-x', x);
            item.attr('data-y', y);
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
