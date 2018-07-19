class Load {
    static imagesToLoad(number) {
        if (!Load.numberOfImages) {
            Load.numberOfImages = 0;
        }
        Load.numberOfImages += number;

        var percentageToShow = parseInt((Load.numberOfImagesLoaded / Load.numberOfImages) * 100) + '%';
        if(Load.progressBar) {
            Load.progressBar.children().css('width', percentageToShow);
        }
        else {
            this.percentageToShow = percentageToShow;
        }

        if (Load.isLoaded()) {
            Load.hide();
        }
    }

    static imageLoaded() {
        if (!Load.numberOfImagesLoaded) {
            Load.numberOfImagesLoaded = 0;
        }
        Load.numberOfImagesLoaded++;
        if (Load.isLoaded()) {
            Load.hide();
        }
    }

    static isLoaded() {
        return Load.numberOfImages === Load.numberOfImagesLoaded;
    }

    static addLoad() {
        Load.load = GameManager.get().getGameArea().find('#load');

        Load.progressBar = $('<div>', {id: 'load-progress'}).append($('<div>', {id: 'load-progress-bar'}));
        if(this.percentageToShow) {
            Load.progressBar.children().css('width', this.percentageToShow);

        }
        Load.load.append($('<div>', {class: "loading"}).append($('<p>', {text: Locale.get('game', '_loading')})).append(Load.progressBar));
        Load.show();
    }

    static hide() {
        Load.load.css("display", "none");
    }

    static show() {
        Load.load.css("display", "block");
    }
}
