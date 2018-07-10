class Locale {
    static get(lang, locale) {
        return Locale.locales[lang][locale];
    }
}
Locale.locales = {
    'pl' : {
        '_match_pictures': 'Dopasuj filmy do tytułów',
        '_success': 'Brawo!'
    }
}
