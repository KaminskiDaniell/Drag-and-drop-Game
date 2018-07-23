// target elements with the "draggable" class
interact('.tile')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "#game-area",
            endOnly: true,
            elementRect: {top: 0, left: 0, bottom: 0, right: 0}
        },
        // enable autoScroll
        autoScroll: true,

        onstart: function (e) {
            e = e || window.event;
            var target = e.target;
            resetColors();
            PuzzleGame.singleDrag = [];
        },

        onmove: function (e) {
            e = e || window.event;
            let x = e.clientX;
            let y = e.clientY;
            let element = document.elementFromPoint(x, y);
            if (PuzzleGame.singleDrag.indexOf(element) < 0)
                if (element.classList.contains("tile")) {
                    element.classList.add('dragged');
                    PuzzleGame.singleDrag.push(element);
                }
        },

        onend: function (e) {
            e = e || window.event;
            let x = e.clientX;
            let y = e.clientY;
            let element = document.elementFromPoint(x, y);
            if (PuzzleGame.singleDrag.indexOf(element) < 0)
                if (element.classList.contains("tile")) {
                    element.classList.add('dragged');
                    PuzzleGame.singleDrag.push(element);
                }
            GameManager.get().checkSelectedWord();
        }
    });

function resetColors() {
    PuzzleGame.singleDrag.forEach(function (entry) {
        entry.classList.remove("dragged")
    })
}
