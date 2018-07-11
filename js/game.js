class Game {
    constructor(gameAreaId){
        this.gameArea = $('#' + gameAreaId);
    }
    
    getFolder() {
        return Game.folder;
    }

    getGameArea() {
        return this.gameArea;
    }
}

Game.folder = 'img/';

