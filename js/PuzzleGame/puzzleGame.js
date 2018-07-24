class PuzzleGame extends Game {
    constructor(gameAreaId, version) {
        super(gameAreaId, version);
        this.toGuess = [];
        this.matrix = [];
        PuzzleGame.singleDrag = [];
        this.emptyMatrix();
        let ret = false;
        while (!ret)
            ret = this.putWordIntoArray();
        this.createGameFields();
        this.addClickListeners();
    }

    static loadImages() {
        return 0;
    }

    emptyMatrix() {
        for (let i = 0; i < PuzzleGame.height; i++) {
            this.matrix[i] = new Array(PuzzleGame.width);
        }
    }

    addClickListeners() {
    }

    getRandomCharacter() {
        const possible = "abcdefghijklmnopqrstuvwxyz";
        return possible.charAt(Math.floor(Math.random() * possible.length));

    }

    putWordIntoArray() {
        this.toGuess = [];
        this.emptyMatrix();
        this.sources = PuzzleGame.sources.slice();
        while (this.sources.length > 0) {
            let index = Math.floor(Math.random() * (this.sources.length));
            let word = Locale.get('words', this.sources[index]);
            let reversed = Math.random() < 0.6;
            if (reversed)
                word = word.split("").reverse().join("");
            this.sources.splice(index, 1);
            let wordPut = false;
            let missesAllowed = 100;
            while (!wordPut) {
                wordPut = false;
                let randx;
                let randy;
                let idString = '';
                let vertical = Math.random() < 0.5;
                let iterator = 0;
                let canPut = true;
                if (!vertical) {
                    randx = Math.floor(Math.random() * (PuzzleGame.height - word.length > 0 ? PuzzleGame.height - word.length : 1));
                    randy = Math.floor(Math.random() * PuzzleGame.width);
                    if (randx + word.length < PuzzleGame.height)
                        for (let x = randx; x < randx + word.length; ++x) {
                            if (this.matrix[x][randy] && this.matrix[x][randy].letter !== word[iterator]) {
                                canPut = false;
                            } else {
                                if (this.matrix[x][randy] && this.matrix[x][randy].vertical === vertical)
                                    canPut = false;
                            }
                            iterator++;
                        }
                    else canPut = false;
                    if (canPut) {
                        wordPut = true;
                        iterator = 0;
                        for (let x = randx; x < randx + word.length; ++x) {
                            idString += x.toString() + randy;
                            this.matrix[x][randy] = new PuzzleGameObject(this, word[iterator], vertical);
                            iterator++;
                        }
                        this.toGuess.push(idString);
                    }
                } else {
                    randy = Math.floor(Math.random() * (PuzzleGame.width - word.length > 0 ? PuzzleGame.width - word.length : 1));
                    randx = Math.floor(Math.random() * PuzzleGame.height);
                    if (randy + word.length < PuzzleGame.height)
                        for (let y = randy; y < randy + word.length && y < PuzzleGame.height; ++y) {
                            if (this.matrix[randx][y] && this.matrix[randx][y].letter !== word[iterator]) {
                                canPut = false;
                            } else {
                                if (this.matrix[randx][y] && this.matrix[randx][y].vertical === vertical)
                                    canPut = false;
                            }
                            iterator++;
                        }
                    else canPut = false;
                    if (canPut) {
                        wordPut = true;
                        iterator = 0;
                        for (let y = randy; y < randy + word.length && y < PuzzleGame.height; ++y) {
                            idString += randx.toString() + y;
                            this.matrix[randx][y] = new PuzzleGameObject(this, word[iterator], vertical);
                            iterator++;
                        }
                        this.toGuess.push(idString)
                    }
                }
                missesAllowed--;
                if (missesAllowed < 0) {
                    PuzzleGame.width++;
                    PuzzleGame.height++;
                    return false;
                }
            }
        }
        return true;
    }

    checkSelectedWord() {
        let string = '';
        let toReverse = '';
        let word = '';
        PuzzleGame.singleDrag.forEach(function (entry) {
            word += entry.textContent;
            string += entry.id;
            toReverse += entry.id + ',';
        });
        let reversedString = toReverse.split(",").reverse().join("");
        let reversedWord = word.split('').reverse().join('');
        let indexReversed = this.toGuess.indexOf(reversedString);
        let index = this.toGuess.indexOf(string);
        if (index >= 0 || indexReversed >= 0) {
            PuzzleGame.singleDrag.forEach(function (entry) {
                entry.classList.add("correct");
            });
            let div = document.getElementById(word);
            if (div) div.classList.add('found');
            else document.getElementById(reversedWord).classList.add('found');
            if (index >= 0) {
                this.toGuess.splice(index, 1);
            }
            else if (indexReversed >= 0) {
                this.toGuess.splice(indexReversed, 1);
            }
            if (this.toGuess.length === 0) {
                Snackbar.show("success", '_success');
            }
            return true;
        }
        return false;
    }

    createGameFields() {
        let gameArea = this.getGameArea();
        gameArea.append($('<div>', {id: 'puzzle'}).append(this.makeTable()))
            .append($('<div>', {id: 'hints'})
                .append(this.makeHintsTable()));
    }

    makeHintsTable() {
        var table = document.createElement('table');
        table.classList.add('hintsTable');
        for (var i = 0; i < PuzzleGame.sources.length; i++) {
            var row = document.createElement('tr');
            var cell = document.createElement('td');
            cell.id = Locale.get('words', PuzzleGame.sources[i]);
            cell.textContent = Locale.get('words', PuzzleGame.sources[i]);
            row.appendChild(cell);
            table.appendChild(row);
        }
        return table;
    }

    makeTable() {
        var table = document.createElement('table');
        for (var i = 0; i < this.matrix.length; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < this.matrix[i].length; j++) {
                var cell = document.createElement('td');
                cell.classList.add("tile");
                cell.id = i.toString() + j;
                cell.textContent = this.matrix[i][j] === undefined ? this.getRandomCharacter() : this.matrix[i][j].letter;
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        return table;
    }
}