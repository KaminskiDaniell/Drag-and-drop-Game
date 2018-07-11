class Locale {
    
    static get(domain, locale) {
        return Locale.locales[Locale.current][domain][locale];
    }

    static getLanguage() {
        return Locale.current;
    }

    static setLanguage(lang) {
        Locale.current = lang;
    }
    
    static getLanguages() {
        return Object.keys(Locale.locales);
    }
}

Locale.current = 'pl'
