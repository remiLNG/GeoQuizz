let state = {
    question: null,
}

let countries;
let questionNumber = 1;
let questionTotal = 3;

const init = async () => {
    state.question = document.querySelector("#question");

    // Acces à toutes les informations des pays


    const response = await fetch("https://restcountries.eu/rest/v2/all");
    countries = await response.json();
    
    //Methode pour quand on aura le serveur
    //const geo = require('geo');
    //et rawdata = geo.readFileSync('geo.json');
    //countries = JSON.parse(rawdata);

    generateQuestion();
}

window.onload = init;


const generateQuestion = () => {

    questions = createQuestion(countries);

    // Afficher suivi des questions
    state.question.querySelector("p").innerHTML = " Question " + questionNumber + " / " + questionTotal;

    // Afficher la question
    state.question.querySelector("#questionTitle").innerHTML = "Quel est la capitale de ce pays ?";
    state.question.querySelector("#pays").innerHTML = questions.pays;

    //Ajouter les choix de reponses sur la page
    const reponses = questions.possibilities.map((possibility) => {
        return `<li id="response" class="btnanswer police">${possibility}</li>`;
    });
    state.question.querySelector("ul").innerHTML = reponses.join('');

}


const createQuestion = (countries) => {
    const random = parseInt(Math.random() * countries.length);


    // Pays aleatoire parmis la liste
    while (countries[random].capital == "") {
        random = parseInt(Math.random() * countries.length);
    }
    const country = countries[random];

    // Liste des reponses
    const possibilities = [];

    while (possibilities.length < 3) { //On affiche 3 reponses random
        const r = parseInt(Math.random() * countries.length);
        while (countries[r].capital == "") {
            r = parseInt(Math.random() * countries.length);
        }
        const capCity = countries[r].capital;
        if (!possibilities.includes(capCity) && capCity != country.capital) {
            possibilities.push(capCity);
        }
        else {
            console.log("doublon")
        }

    }

    possibilities.push(country.capital); //on ajoute la bonne reponse
    possibilities.sort((a, b) => { //on tri la liste des reponses
        return a.charCodeAt(0) - b.charCodeAt(0);
    });

    const questions = {
        cap: country.capital,
        pays: country.translations.fr,
        possibilities
    }


    return questions
    

}