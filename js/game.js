class Game {
    constructor(gameAreaId) {
        this.gameObjects = [];
        this.callbacks = [];
        this.gameArea = $('#' + gameAreaId);

        var modal = $('<div>', {id: 'modal', class: "modal"});
        this.gameArea.append(modal);
        this.gameArea.append(Load.getLoad());
    }

    getFolder() {
        return Game.folder;
    }

    getGameArea() {
        return this.gameArea;
    }

    addLocaleCallback(callback) {
        this.callbacks.push(callback);
    }

    loadLocale() {
        this.callbacks.forEach(function (callback) {
            callback();
        });
        this.gameObjects.forEach(function (gameObject) {
            gameObject.loadLocale();
        });
    }

    static loadImages() {

    }
}

Game.folder = 'img/';

