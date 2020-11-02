// Variables globales

let state = {
    question: null
}

let countries = [];
let questions = {};
let questionNumber = 1;
let questionTotal = 1;

const init = async () => {
    state.question = document.querySelector("#question");

    // Acces à toutes les informations des pays
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    countries = await response.json();

    pickQuestion();
}

const pickQuestion = () => {

    questions = createQuestion(countries);

    //Aficher suivi des questions
    state.question.querySelector("p").innerHTML = " Question " + questionNumber + " / " + questionTotal;
 

    // Afficher un drapeau
    state.question.querySelector("img").setAttribute("src",questions.flag);

    //Ajouter les reponses sur la page
    const reponses = questions.possibilities.map((possibility) => {
        return `<li>${possibility}</li>`;
    });
    state.question.querySelector("ul").innerHTML = reponses.join('');
}

window.onload = init;


const createQuestion = (countries) => {
    const random = parseInt(Math.random() * countries.length);

    // Pays aleatoire parmis la liste
    const country = countries[random];

    // Liste des reponses
    const possibilities = [];
    
    for(let i =0; i<3; i++){ //On affiche 3 reponses random
        const r = parseInt(Math.random() * countries.length);
        const name = countries[r].name;
        possibilities.push(name);
    }

    possibilities.push(country.name); //on ajoute la bonne reponse
    possibilities.sort((a,b) =>{ //on tri la liste des reponses
        return a.charCodeAt(0) - b.charCodeAt(0);
    });

    const question = {
        flag: country.flag,  //on recupere le drapeau
        possibilities
    }

    return question;
}