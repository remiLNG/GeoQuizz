// Variables globales

let state = {
    question: null,
    answer: null
}

let countries = [];
let questions = {};
let questionNumber = 1;
let questionTotal = 1;

const init = async () => {
    state.question = document.querySelector("#question");
    state.answer = document.querySelector("#answer");

    // Acces à toutes les informations des pays
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    countries = await response.json();

    state.question.querySelector('ul').addEventListener('click',({target}) => {
        if (target.matches('li')){
             const userAnswer = target.innerHTML;
             checkAnswer(userAnswer);
        }
    });

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

    const questions = {
        flag: country.flag,  //on recupere le drapeau
        answer: country.name,
        possibilities
    }

    return questions;
}

const switchPanel = (states) =>{
    switch(states){
        case 'answer':
            state.answer.style.display = 'block';
            state.question.style.display = 'none';
            break;
        case 'question':
            state.answer.style.display = 'none';
            state.question.style.display = 'block';
            break;
        default:
            state.answer.style.display = 'none';
            state.question.style.display = 'none';
            break;
    }
};

const checkAnswer = (userAnswer) => {
    if(userAnswer === questions.answer){
        state.answer.querySelector('h2').innerHTML ='Good answer';
        state.answer.querySelector('p').innerHTML ='';
    }else{
        state.answer.querySelector('h2').innerHTML ='Wrong answer';
        state.answer.querySelector('p').innerHTML =`The answer was: ${questions.answer}`;

    }
    switchPanel('answer');
}
