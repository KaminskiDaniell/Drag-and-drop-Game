class Game {
    constructor(gameAreaId, version, className) {
        this.gameObjects = [];
        this.callbacks = [];
        this.gameArea = $('#' + gameAreaId);
        Game.version = version;
        $.each(className.versions[version], function (i, obj) {
            className[i] = obj;
        });
        var modal = $('<div>', {id: 'modal', class: "modal"});
        this.gameArea.append(modal);
        this.gameArea.append(Load.getLoad());
    }

    getGameVersion() {
        return Game.version;
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

