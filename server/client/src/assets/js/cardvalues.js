const cardvaluelist = [
    
    {
        id: '0',
        name: "McDonald's",
        picUrl: '/img/wine.jpg',
        formTitle: 'Ravintolakysely',
        formText: 'Käytkö usein ravintoloissa syömässä? Tai jos et, niin kiinnostaisiko muut vaihtoehdot? Kerro meille!',
        formUrl: '/survey0',
        color: 'yellow',
        minutes: '(3 pts)',
        tyyppi: 'Vastaa',
        resetHours: 1
    },

    {
        id: 'mc_d2',
        name: "McDonald's",
        picUrl: '/img/beef.jfif',
        formTitle: 'Menutestaus Helsinki',
        formText: 'Uusi French Beef. Valkosipulisämpylän välissä kaksi 100% naudanlihapihviä, siivu emmental-sulatejuustoa, kaksi viipaletta pekonia ja bataviasalaattia.',
        formUrl: '/survey1',
        color: 'purple',
        tyyppi: 'Feed'
    },

    {
        id: 'mcdonalds_3',
        name: "McDonald's",
        picUrl: '/img/salaatti.jfif',
        formTitle: 'All Vegan -salaatti',
        formText: 'Uudessa raikkaassa All Vegan -salaatissa maistuvat soijapavut, lehtikaali, pinaatti ja pikkelöity porkkana. Nimensä mukaisesti salaatti on 100 % vegaaninen.',
        formUrl: '#',
        color: 'purple',
        tyyppi: 'Feed'
    },

    {
        id: '1',
        name: "Hesburger",
        picUrl: '/img/food.jpg',
        formTitle: 'Päivittäinen ravintola-arvostelu',
        formText: 'Kävitkö tänään ravintolassa? Kerro meille miltä maistui! Vastaamalla kyselyyn autat ravintoloitsijoita tarjoamaan paremman kokemuksen asiakkaille - samalla sinä ansaitset pisteitä',
        formUrl: '/survey1',
        color: 'yellow',
        minutes: '(5 pts)',
        tyyppi: 'Vastaa',
        resetHours: 1

    },

    {
        id: 'hese_2',
        name: "Hesburger",
        picUrl: '/img/hese2.png',
        formTitle: 'Menutestaus Jyväskylä',
        formText: 'Supersuosittu Kebab-hampurilainen.',
        formUrl: '#',
        color: 'green',
        tyyppi: 'Feed'

    },

    {
        id: '2',
        name: "Burger King",
        picUrl: '/img/coffee.jpg',
        formTitle: 'Taustakysely',
        formText: 'Kerro hieman lisää itsestäsi, jotta voimme räätälöidä palvelumme kattamaan juuri sinun tarpeitasi',
        formUrl: '/survey2',
        color: 'yellow',
        minutes: '(10 pts)',
        tyyppi: 'Vastaa',
        resetHours: 1

    },

    {
        id:'burgerking_2',
        name: "Burger King", 
        picUrl: '/img/whopper.png', 
        formTitle: 'Menutestaus Tampere',
        formText: 'TRIPLA WHOPPER - Kolme kerrosta makusi mukaan',
        formUrl: '#', 
        color: 'yellow',
        tyyppi: 'Feed'
    },

    {
        id: 'a1',
        boxIcon: 'bx bx-message-detail',
        count: 15,
        cardText: 'Vastatut kyselyt',
        tyyppi: 'Activity',
        suffix: '',
        color: 'blue'
    },

    {
        id: 'a2',
        boxIcon: 'bx bx-coin-stack',
        count: 72,
        cardText: 'Kerrytetty bonus',
        tyyppi: 'Activity',
        suffix : '€',
        color: 'green'
    },

    {
        id: 'a3',
        boxIcon: 'bx bx-been-here',
        count: 5,
        cardText: 'Menutestiä yhteensä',
        tyyppi: 'Activity',
        suffix : '',
        color: 'orange'
    },

    {
        id: 'a4',
        boxIcon: 'bx bx-diamond',
        count: 32,
        cardText: 'Arvonta kuponkia',
        tyyppi: 'Activity',
        suffix : '',
        color: 'indigo'
    }

]


export default cardvaluelist


