class Game {
    constructor(gameAreaId){
        this.gameObjects = [];
        this.gameArea = $('#' + gameAreaId);
    }
    
    getFolder() {
        return Game.folder;
    }

    getGameArea() {
        return this.gameArea;
    }

    loadLocale(){
        this.gameObjects.forEach(function(gameObject) {
            gameObject.loadLocale();
        });
    }

}

Game.folder = 'img/';

