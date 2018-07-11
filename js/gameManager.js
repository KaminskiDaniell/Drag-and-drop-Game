class GameManager {
    static set(className, gameAreaId){
        GameManager.game = new className(gameAreaId);
    }
    
    static get(){
        return GameManager.game;
    }
}
