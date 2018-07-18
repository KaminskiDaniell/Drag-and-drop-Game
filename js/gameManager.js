class GameManager {
    static set(className, gameAreaId, withoutDropdown = false, withoutSnackbar = false) {
        $("#" + gameAreaId).empty();
        Locale.setLanguage();
        GameManager.game = new className(gameAreaId);
        if (!withoutDropdown)
            Dropdown.setDropdown();
        if (!withoutSnackbar) {
            Snackbar.setSnackbar();
            Snackbar.show("info", '_start_header', '_start');
        }
        // For moodle
        window.top.$('#resourceobject').css('border','0px');
        
    }

    static get() {
        return GameManager.game;
    }

}
