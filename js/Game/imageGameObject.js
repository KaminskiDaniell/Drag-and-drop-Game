class ImageGameObject extends GameObject {
    constructor(val, name, id, game) {
        super();
        this.id = id;
        this.game = game;
        this.val = game.getFolder() + val;
        this.name = name;
        this.image = this.createImage(id, this.val);
        this.title = this.createTitle(id, this.name);
        this.matched = false;
    }

    createImage(id, src){
        return $("<div>", {id: src, class: "image draggable left yes-drop dropzone"}).append($("<img>", {src: src, alt: src}));
    }

    createTitle(id, text){
        return $("<div>", {id: text, class: "title draggable right yes-drop dropzone"}).append($("<div>").append(Locale.get('title', text)));
    }

    attach(item){
        if(item === 'image') {
            this.game.getGameArea().append(this.image);
        }
        if(item === 'title') {
            this.game.getGameArea().append(this.title);
        }
    }

    markAsMatched() {
        if(++this.game.matched == this.game.gameObjects.length){
            clearInterval(this.game.timeInterval);
            modal.style.display = "block";
            Snackbar.showMessage("success", Locale.get('game', '_success'));
        }
        this.game.addScore();
        this.title.remove();
        this.image.append(this.title.children("div"));
        this.image.removeClass('dragged-in');
        this.image.removeClass('dropzone');
        this.image.removeClass('yes-drop');
    }

}

