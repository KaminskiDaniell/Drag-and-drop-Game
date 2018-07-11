class Game {
    constructor(gameAreaId){
        this.gameArea = $('#' + gameAreaId);
    }
    
    getFolder() {
        return Game.folder;
    }
}

Game.folder = 'img/';

