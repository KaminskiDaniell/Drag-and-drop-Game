class GameManager {
    static set(className, gameAreaId) {
        $("#" + gameAreaId).empty();
        GameManager.game = new className(gameAreaId);
        Dropdown.setDropdown();
        Snackbar.setSnackbar();
        Snackbar.show("info", '_start');
    }

    static get() {
        return GameManager.game;
    }

}
