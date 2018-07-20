class MemoGameObject extends GameObject {
    constructor(val, type, game) {
        super(game);
        this.val = val;
        this.type = type;
        this.object = this.create(type, this.val);
        this.loadLocale();
        this.clickable = true;
        this.hidden = true;
    }

    create(type, src) {
        var object = $("<div>", {class: "memo-object"});
        object.on('click', () => {
            this.click();
        });
        object.append($("<div>", {class: "memo-object-front"}).append($('<div>', {class: 'memo-object-page'}).append($('<img>', {src: this.getGame().getFolder() + 'MemoGame/bulb.png'}))))
            .append($("<div>", {class: "memo-object-back"}).append($('<div>', {class: 'memo-object-page'})));
        return object;
    }

    attach() {
        this.getGame().getGameArea().find('#memo').append(this.object);
    }

    loadLocale() {
        super.loadLocale();
        this.object.children('p').text(Locale.get('title', this.name));
    }

    click() {
        if(this.clickable) {
            if(this.getGame().toHide) {
                for(var i in this.getGame().toHide) {
                    this.getGame().toHide[i].hide();
                }
                this.getGame().toHide = null;
            }
            if(this.getGame().memoRevealed) {
                if(this.getGame().memoRevealed === this) {
                    return;
                }
                this.getGame().match(this.getGame().memoRevealed, this);
            }
            else {
                this.getGame().memoRevealed = this;
            }
            if(this.hidden) {
                this.show();
            }
            else {
                this.hide();
            }
        }
    }

    check() {
        this.object.prop('click', null).off('click');
    }

    hide() {
        if(this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.object.find('.memo-object-back').find('.memo-object-page').empty();
            this.clickable = true;
            clearTimeout(this.timeout);
        }, 600);
        this.hidden = true;
        this.object.css('transform', '');
    }

    hideDelayed() {
        this.timeout = setTimeout(() => {
            this.hide();
            this.getGame().toHide = null;
        }, 1000);
    }

    show() {
        this.object.css('transform', 'rotateY(180deg)');
        //this.object.find('.memo-object-front').empty();
        if(this.type === 'image') {
            this.object.find('.memo-object-back').find('.memo-object-page').append($("<img>", {
                src: this.val,
                alt: this.val
            }));
        }
        else if(this.type === 'title') {
            this.object.find('.memo-object-back').find('.memo-object-page').append($("<p>", {text: Locale.get('title', this.val)}));
        }
        this.clickable = false;
        this.hidden = false;
    }

    loadLocale() {
        super.loadLocale();
        if(this.type === 'title') {
            this.object.find('.memo-object-back').find('p').text(Locale.get('title', this.val));
        }
    }
}
