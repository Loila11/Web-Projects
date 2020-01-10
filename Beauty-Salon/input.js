
var monthNames = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie"
];
var daysInfo = [{
        "name": "Lun",
        "openingHour": 9,
        "closingHour": 21
    }, {
        "name": "Mar",
        "openingHour": 9,
        "closingHour": 21
    }, {
        "name": "Mie",
        "openingHour": 9,
        "closingHour": 21
    }, {
        "name": "Joi",
        "openingHour": 9,
        "closingHour": 21
    }, {
        "name": "Vin",
        "openingHour": 9,
        "closingHour": 21
    }, {
        "name": "Sam",
        "openingHour": 9,
        "closingHour": 18
    }, {
        "name": "Dum",
        "openingHour": 9,
        "closingHour": 14
    }];
var services = [{
    "name": "Coafor",
    "details": [{
        "name": "Vopsit par scurt",
        "price": 25
    }, {
        "name": "Vopsit par mediu",
        "price": 30
    }, {
        "name": "Vopsit par lung",
        "price": 35
    }, {
        "name": "Tuns varfuri",
        "price": 25
    }, {
        "name": "Spalat pe cap",
        "price": 25
    }]
}, {
    "name": "Manichiura",
    "details": [{
        "name": "Clasica",
        "price": 25
    }, {
        "name": "Semi-permanent",
        "price": 50
    }, {
        "name": "Constructie Gel",
        "price": 120
    }, {
        "name": "Demontat Semi",
        "price": 10
    }, {
        "name": "Demontat Gel",
        "price": 30
    }, {
        "name": "Model",
        "price": 5
    }]
}, {
    "name": "Cosmetica",
    "details": [{
        "name": "Axila",
        "price": 10
    }, {
        "name": "Scurt",
        "price": 15
    }, {
        "name": "Lung",
        "price": 25
    }, {
        "name": "Inghinal",
        "price": 25
    }, {
        "name": "Brate",
        "price": 20
    }, {
        "name": "Mustata",
        "price": 10
    }]
}];
var label = {
    prevMonth: "Luna anterioara",
    nextMonth: "Luna urmatoare",
    title: "Fa-ti o programare",
    name: "Nume:",
    namePlaceholder: "",
    email: "Email:",
    emailPlaceholder: "",
    number: "Numar de telefon:",
    numberPlaceholder: "",
    password: "Parola:",
    hour: "La ce ora doriti sa va faceti programarea?",
    services: "Alegeti tipul de serviciu:",
    submit: "Programeaza-ma"
};
var register = {
    title: "Inregistrare",
    button: "Inregistrare",
    error: "Exista deja un utilizator cu aceasta adresa de email. Contul nu a fost creat.",
    succes: "Contul a fost creat cu succes!",
};
var login = {
    title: "Autentificare",
    button: "Autentificare",
    error: "Datele oferite sunt incorecte",
    success: "Te-ai autentificat cu succes!",
};
var nav = {
    logo_url: "logo.jpg",
    logout: "Deconectare",
    delete: "Stergeti contul",
    prices: "Preturi",
    account: "Contul meu",
    appointments: "Programari",
    about: "Despre noi"
};
var footer = {
    title:"Contact",
    adress: "Str. Lorem, nr. 10, Ipsum",
    phone: "Telefon: 07********/ 031*******",
    email: "contact@salon.com",
    schedule: ["Luni-Vineri: 9:00 - 21:00", "Sambata: 9:00 - 18:00", "Duminica: 9:00 - 14:00"]
};
var account = {
    errorTitle: "Ups! Se pare ca nu esti logat.",
    errorSubtitle: "Inregistreaza-te sau autentifica-te pentru a avea acces la programarile tale",
    noAppointments: "Nu aveti nicio programare momentan",
    delete: "Stergeti",
    deleteMessage: "Sigur doriti sa anulati programarea?",
    appointmentCreateSuccess: "Programarea dumneavoastra a fost realizata cu succes!",
    unspecified: "Nespecificat"
};
var user = {
    message: "Bine ai venit"
};
var about = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at leo ut massa imperdiet porta sit amet id tortor. Phasellus tincidunt lorem neque, vel tincidunt quam posuere vitae. Suspendisse ultrices ornare luctus. Integer quis iaculis lectus, vitae iaculis neque. Curabitur dignissim aliquam felis in tristique. Sed vitae efficitur est. Etiam mattis urna ac consequat viverra. Quisque eu lectus in nisl finibus rhoncus ac pharetra elit. Duis sed lacus in est bibendum congue.",
    "Phasellus accumsan turpis et eros fringilla, a tincidunt sapien molestie. Suspendisse eget pretium mauris, sit amet condimentum nisl. Curabitur consequat, ipsum a commodo vehicula, lacus risus blandit sapien, eget molestie eros enim quis ante. Aliquam vestibulum tortor a tristique dignissim. Pellentesque congue ex eget velit congue eleifend. Proin quis blandit eros. Nulla non diam massa. Maecenas eu mattis elit, ac ultrices est. Maecenas sed justo velit. Vestibulum velit ex, viverra sit amet pellentesque ut, eleifend quis massa. Aliquam dignissim nunc quis ante consequat aliquet."];
var now = new Date();
var date = {
    month: now.getMonth(),
    year: now.getFullYear()};
var data = null;
var currentUserId = null;
