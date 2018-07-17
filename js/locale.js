class Locale {
    
    static get(domain, locale, ...words) {
        locale = Locale.locales[Locale.current][domain][locale];
        for(var i in words) {
            var word = words[i];
            locale = locale.replace(/%s/, word);
        }
        return locale;
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

Locale.locales = {};
Locale.current = window.top.$('html').attr('lang') || 'en';
