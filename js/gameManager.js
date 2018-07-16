class GameManager {
    static set(className, gameAreaId, withoutDropdown = false, withoutSnackbar = false) {
        $("#" + gameAreaId).empty();
        GameManager.game = new className(gameAreaId);
        if (!withoutDropdown)
            Dropdown.setDropdown();
        if (!withoutSnackbar) {
            Snackbar.setSnackbar();
            Snackbar.show("info", 'Brawo', '_start', false);
        }
    }

    static get() {
        return GameManager.game;
    }

}
