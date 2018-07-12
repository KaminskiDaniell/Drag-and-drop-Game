class Snackbar {
    static showMessage(type, message, localized = false) {
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
        if (!localized)
            snackbar_body.innerHTML = Locale.get('game', message);
        else
            snackbar_body.innerHTML = message;
        snackbar_body.style.color = "#FFFFFF";

        Snackbar.message = message;
    }

    static setSnackbar() {
        var modal = GameManager.get().getGameArea().find('#modal');

        modal.append($('<div>', {id: "snackbar"})
            .append($('<span>', {class: 'close'})
                .append('&times;'))
            .append($('<span>', {id: 'snackbar-body'})));

        modal = modal[0];

        // Get the <span> element that closes the modal
        var span = modal.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = Snackbar.hide;

        GameManager.get().addLocaleCallback(function () {
            $('#snackbar-body').text(Locale.get('game', Snackbar.message));
        });
    }
    
    static addCallback(callback = function() {}){
        if(!Snackbar.callbacks) {
            Snackbar.callbacks = [];
        }
        Snackbar.callbacks.push(callback);
    }

    static show(type, message, localized) {
        var modal = GameManager.get().getGameArea().find('#modal')[0];
        modal.style.display = 'block';
        Snackbar.showMessage(type, message, localized);
    }

    static hide() {
        var modal = GameManager.get().getGameArea().find('#modal')[0];
        modal.style.display = "none";
        if(Snackbar.callbacks) {
            Snackbar.callbacks.forEach(function (callback) {
                callback();
            });
        }
    }

    static isVisible(){
        return GameManager.get().getGameArea().find('#modal').css('display') === 'block';
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
