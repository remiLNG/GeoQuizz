// Variables globales

let state = {
    question: null
}

let countries = [];
let questions = {};


const init = async () => {
    state.question = document.querySelector("#question");

    // Acces à toutes les informations des pays
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    countries = await response.json();

    pickQuestion();
}

const pickQuestion = () => {

    questions = createQuestion(countries);
    // Afficher un drapeau
    state.question.querySelector("img").setAttribute("src",questions.flag);
}

window.onload = init;


const createQuestion = (countries) => {
    const random = parseInt(Math.random() * countries.length);

    // Pays aleatoire parmis la liste
    const country = countries[random];

    const question = {
        flag: country.flag,  //on recupere le drapeau
    }

    return question;
}