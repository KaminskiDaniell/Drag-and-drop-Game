class GameManager {
    static set(className, gameAreaId){
        GameManager.game = new className(gameAreaId);
        Dropdown.setDropdown();
        Snackbar.setSnackbar();
        Snackbar.show("info", Locale.get('game', '_match_pictures'));
    }
    
    static get(){
        return GameManager.game;
    }
}
