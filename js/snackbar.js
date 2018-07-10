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
    snackbar_body.style.color = "#FFFFFF"
}

function welcomeMessage(message) {
    if (message) {
        showMessage("info", message)
    }
}

function prepareModal() {

    // Get the modal
    var modal = document.getElementById('modal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $(document).ready(function () {
        modal.style.display = 'block';
        showMessage("info", BasketGameObject.welcomeMessage);
    });
}
