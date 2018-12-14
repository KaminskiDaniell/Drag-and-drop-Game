document.addEventListener('keydown', function (event) {
    if (Snackbar.isVisible()) {
        var key = event.key.toLowerCase();
        if (key === ' ' || key === 'enter' || key === 'escape') {
            Snackbar.hide();
        }
    }
    else {
        GameManager.get().insertLetter(event.key);
    }
});
