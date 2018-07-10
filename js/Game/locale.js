class Locale {
    
    static get(locale, lang) {
        if(lang){
            return Locale.locales[lang][locale];
        }
        return Locale.locales[Locale.current][locale];
    }

    static getLanguage() {
        return Locale.current;
    }
}

Locale.current = 'pl'
Locale.locales = {
    'pl' : {
        '_match_pictures': 'Dopasuj filmy do tytułów',
        '_success': 'Brawo!'
    }
}
