class Snackbar {
    static showMessage(type, message) {
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

    static setSnackbar(callback = function () {
    }) {
        var modal = $('<div>', {id: 'modal', class: "modal"})
            .append($('<div>', {id: "snackbar"})
                .append($('<span>', {class: 'close'})
                    .append('&times;'))
                .append($('<span>', {id: 'snackbar-body'})));

        GameManager.get().getGameArea().append(modal);

        modal = modal[0];

        // Get the <span> element that closes the modal
        var span = modal.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
            callback();
        }
    }

    static show(type, message) {
        modal.style.display = 'block';
        Snackbar.showMessage(type, message);
    }

    static prepareButton() {
        // Get the button that opens the modal
        var btn = document.getElementById("button");
        btn.onclick = function () {
            modal.style.display = "block";
            if (BasketGameObject.checkWin())
                showMessage("success", BasketGameObject.successMessage);
            else
                showMessage("error", BasketGameObject.failureMessage);
        }
    }
}
