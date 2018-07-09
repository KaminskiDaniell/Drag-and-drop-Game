function showMessage(type, message) {
    var snackbar = document.getElementById("snackbar");
    if (type === 'success') {
        snackbar.style.background = "#55ff66";
    }
    else if (type === 'error') {
        snackbar.style.background = "#ff0000";
    }
    else if (type === 'info') {
        snackbar.style.background = "#00CED1";
    }
    else {
        snackbar.style.background = "#ffff00";
    }
    var snackbar_body = document.getElementById("snackbar-body");
    snackbar_body.innerHTML = message;
}
