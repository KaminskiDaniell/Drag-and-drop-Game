class Dropdown {
    static setDropdown(gameAreaId) {
        var modal = $('<div>', {class: "dropdown"}).append($("<input>", {
            id: 'buttonMenu',
            type: 'image',
            src: BasketGameObject.folder + "cog.svg"
        })).append($('<div>', {id: "dropdown", class: 'dropdown-content'}).append($('<input>', {
            type: 'image',
            class: 'flag',
            src: BasketGameObject.folder + "poland.svg"
        })).append($('<input>', {
            type: 'image',
            class: 'flag',
            src: BasketGameObject.folder + "uk.svg"
        })));

        $('#' + gameAreaId).append(modal);

        var button = $('#buttonMenu');
        button.on('click', function () {
            $('#dropdown').toggleClass('showDropdown');
        });

        window.onclick = function (event) {
            if (!event.target.matches('#buttonMenu')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('showDropdown')) {
                        openDropdown.classList.remove('showDropdown');
                    }
                }
            }
        }
    }

}
