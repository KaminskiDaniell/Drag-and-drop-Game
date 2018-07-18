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
        var resourceObject = window.top.document.getElementById('resourceobject');
        if(resourceObject) {
            resourceObject[0].style.border = '0px';
        }
        
    }

    static get() {
        return GameManager.game;
    }

}
