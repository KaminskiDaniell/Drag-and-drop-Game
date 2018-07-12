class GameManager {
    static set(className, gameAreaId){
        GameManager.game = new className(gameAreaId);
        Dropdown.setDropdown();
        Snackbar.setSnackbar();
        Snackbar.show("info", '_start');
    }
    
    static get(){
        return GameManager.game;
    }
}
