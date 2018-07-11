class Dropdown {
    static setDropdown(gameAreaId) {

        var inputs = [];
        var dropdown = $('<div>', {id: "dropdown", class: 'dropdown-content'});

        Locale.getLanguages().forEach(function (entry) {
            var input = $('<input>', {
                type: 'image',
                class: 'flag',
                src: GameManager.get().getFolder() + entry + ".svg",
            })
            input.on('click', function () {
                //GameObject.reloadLocale();
            });
            dropdown.append(input);
        });

        var modal = $('<div>', {class: "dropdown"}).append($("<input>", {
            id: 'buttonMenu',
            type: 'image',
            src: GameManager.get().getFolder() + "cog.svg"
        })).append(dropdown);

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
