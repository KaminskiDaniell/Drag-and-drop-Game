class Load {
    static imagesToLoad(number) {
        if (!Load.numberOfImages) {
            Load.numberOfImages = 0;
        }
        Load.numberOfImages += number;
        if (Load.isLoaded()) {
            console.log("HIDE");
            Load.hide();
        }
    }

    static imageLoaded() {
        if (!Load.numberOfImages) {
            Load.numberOfImages = 0;
        }
        Load.numberOfImages--;
        if (Load.isLoaded()) {
            console.log("HIDE");
            Load.hide();
        }
    }

    static isLoaded() {
        return Load.numberOfImages === 0;
    }

    static addLoad() {
        Load.load = GameManager.get().getGameArea().find('#load');

        Load.load.append($('<div>', {class: "loading"}).append("LOADING"));
        Load.show();
    }

    static hide() {
        Load.load.css("display", "none");
    }

    static show() {
        Load.load.css("display", "block");
    }
}
