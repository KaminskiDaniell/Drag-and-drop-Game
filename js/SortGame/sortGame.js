class SortGame extends Game {
    constructor(gameAreaId) {
        super(gameAreaId);
        Snackbar.removeCallbacks();
        this.addClickListeners();
        this.createGameFields();
        this.text = this.randomPhrase();
        this.createPhraseSpace(this.text);
        this.fillDefinitionArea(this.text);
        this.setSortable();
    }


    static loadImages() {
        return 0;
    }

    shuffle(array) {
        array.forEach(function (entry) {
            var old = entry.slice();
            while (old.length === entry.length && old.every(function (value, index) {
                return value === entry[index]
            })) {
                var spliced = false;
                if (old.indexOf(" ") >= 0) {
                    old.splice(-1, 1);
                    spliced = true;
                }
                if (old.length === 2)
                    [entry[0], entry[1]] = [entry[1], entry[0]];
                else if (old.length === 1) {
                    break;
                }
                if (spliced)
                    old.push(" ");
                for (let i = entry.length - 2; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [entry[i], entry[j]] = [entry[j], entry[i]];
                }
            }
        });
    };

    formatText(str) {
        str = str.replace(/ /g, '');
        str = str.toUpperCase();
        return str;
    }

    randomPhrase() {
        if (!this.sources || this.sources.length === 0) {
            this.sources = SortGame.sources.slice();
        }
        var index = Math.floor(Math.random() * this.sources.length);
        var result = this.sources[index];
        this.sources.splice(index, 1);
        return result;
    }

    createGameFields() {
        var gameArea = this.getGameArea();
        gameArea
            .append($('<div>', {id: 'definition-area'}));
    }

    fillDefinitionArea(text) {
        var definitionArea = $('#definition-area');
        definitionArea.empty();
        definitionArea.append($('<div>', {class: 'definition'}).append('<p>' + Locale.get('definition', text) + '</p>'))
    }

    createPhraseSpace(text) {
        $("#sort-area").remove();
        this.textLocalized = Locale.get('phrase', text);
        var letterObjects = this.textLocalized.split('');
        var words = [];
        do {
            var x = letterObjects.indexOf(' ');
            if (x >= 0) {
                var word = letterObjects.splice(0, x + 1);
                words.push(word);
            } else {
                words.push(letterObjects)
            }
        } while (x >= 0);

        this.shuffle(words);

        this.letterObjects = [];
        this.getGameArea().append($('<div>', {id: 'sort-area'}));

        var word = $('<div>', {class: 'word'});
        $('#sort-area').append(word);

        for (var j in words) {
            for (var i in words[j]) {
                var letter = words[j][i];

                if (letter === ' ') {
                    var word = $('#sort-area');
                }

                this.letterObjects.push(new LetterGameObject(letter, this.letterObjects.length, word, this));

                if (letter === ' ') {
                    var word = $('<div>', {class: 'word'});
                    $('#sort-area').append(word);
                }
            }
        }
    }

    resetGame() {
        this.text = this.randomPhrase();
        this.createPhraseSpace(this.text);
        this.fillDefinitionArea(this.text);
        this.setSortable()
    }

    checkWin() {
        var string = '';
        var words = $(".letter");
        words.each(function (i, word) {
            string += (word.firstChild.textContent);
        });
        if (string === this.formatText(Locale.get('phrase', this.text))) {
            Snackbar.show('success', '_success_header', '_success');
        }
    }

    setSortable() {
        var words = $(".word");
        words.each(function (i, obj) {
            Sortable.create(obj, {
                animation: 100,
                draggable: ".letter",
                onUpdate: function (evt) {
                    GameManager.get().checkWin();
                    evt.preventDefault();
                }
            });
        });
    }

    addClickListeners() {
        var reset = function () {
            if (!SortGame.gameBegun) {
                SortGame.gameBegun = true
            }
            else {
                GameManager.get().resetGame();
            }
        };
        Snackbar.addCallback(reset)
    }
}
