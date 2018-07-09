function showMessage(type, message) {
    var x = document.getElementById("snackbar");
    if (type === 'success') {
        x.style.background = "#55ff66";
    }
    else if (type === 'error') {
        x.style.background = "#ff0000";
    }
    else if (type === 'info') {
        x.style.background = "#00CED1";
    }
    else {
        x.style.background = "#ffff00";
    }
    x.innerText = message;
    x.className = "show";
    // Time before fade out
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 2100);
}
