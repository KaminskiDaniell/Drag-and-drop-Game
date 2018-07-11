class BasketGameObject extends GameObject {
    constructor(file, val, name, parent) {
        super(parent);
        this.display = val;
        this.file = file;
        this.object = this.createObject(file, this.display);
        this.getGame().getGameArea().append(this.object);
    }

    createObject(src, display) {
        if (src)
            return $("<div>", {class: "draggable left yes-drop image"}).append($("<img>", {
                src: this.getGame().getFolder() + src,
                title: Locale.get('title', display),
                alt: display
            }));
        return $("<div>", {class: "draggable left yes-drop text title"}).append(Locale.get('title', display));
    }

}