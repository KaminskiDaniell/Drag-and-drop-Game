document.addEventListener('keydown', function (event) {
    if (Snackbar.isVisible()) {
        var key = event.key.toLowerCase();
        if (key === ' ' || key === 'enter' || key === 'escape') {
            Snackbar.hide();
        }
    }
    else {
        if(event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
        }
        GameManager.get().insertLetter(event.key);
    }
});
