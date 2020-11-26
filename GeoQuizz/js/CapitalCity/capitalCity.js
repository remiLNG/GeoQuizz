let state = {
    question: null,
}

let countries = [];
let questionNumber = 1;
let questionTotal = 3;

const init = async () => {
    state.question = document.querySelector("#question");

    // Acces à toutes les informations des pays
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    countries = await response.json();

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
}


const createQuestion = (countries) => {
    const random = parseInt(Math.random() * countries.length);


    // Pays aleatoire parmis la liste
    const country = countries[random];

    const questions = {
        pays: country.translations.fr
    }


    return questions

}