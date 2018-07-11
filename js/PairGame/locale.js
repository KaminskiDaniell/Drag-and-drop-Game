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
Locale.locales = {
    'pl' : {
        'game' : {
            '_match_pictures': 'Dopasuj filmy do tytułów',
            '_success': 'Brawo!'
        },
        'title' : {
            '_citizen_kane' : 'Obywatel Kane (1941)',
            '_vertigo' : 'Zawrót głowy (1958)',
            '_la_regle_du_jeu' : 'Reguły gry (1939)',
            '_2001_a_space_odyssey' : '2001: Odyseja kosmiczna (1968)',
            '_tokyo_monogatari' : 'Tokijska opowieść (1953)',
            '_otto_e_mezzo' : '8½ (1963)',
            '_the_godfather' : 'Ojciec Chrzestny (1972)',
            '_sunrise_a_song_of_two_humans' : 'Wschód słońca (1927)',
            '_the_searchers' : 'Poszukiwacze (1956)',
            '_shichinin_no_samurai' : 'Siedmiu samurajów (1954)'
        }
    },
    'en' : {
        'game' : {
            '_match_pictures': 'Match films to titles',
            '_success': 'Congratulations!'
        },
        'title' : {
            '_citizen_kane' : 'Citizen Kane (1941)',
            '_vertigo' : 'Vertigo (1958)',
            '_la_regle_du_jeu' : 'The Rules of the Game (1939)',
            '_2001_a_space_odyssey' : '2001: A Space Odyssey (1968)',
            '_tokyo_monogatari' : 'Tokyo story (1953)',
            '_otto_e_mezzo' : '8½ (1963)',
            '_the_godfather' : 'The Godfather (1972)',
            '_sunrise_a_song_of_two_humans' : 'Sunrise: A Song of two Humans (1927)',
            '_the_searchers' : 'The Searchers (1956)',
            '_shichinin_no_samurai' : 'Seven samurai (1954)'
        }
    }
}
