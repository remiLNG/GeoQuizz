// Variables globales

let state = {
    question: null,
    answer: null
}

let countries = [];
let questions = {};
let questionNumber = 1;
let questionTotal = 3;

const init = async () => {
    state.question = document.querySelector("#question");
    state.answer = document.querySelector("#answer");

    // Acces à toutes les informations des pays
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    countries = await response.json();

 
    
    genererateQuestion();
    validQuestion();
    nextQuestion();
}


const validQuestion = () => {
    state.question.querySelector('ul').addEventListener('click',({target}) => {
        if (target.matches('li')){
             const userAnswer = target.innerHTML;
             checkAnswer(userAnswer);
        }
    });
}


// Passer à la question suivante
const nextQuestion = () => {
    state.answer.querySelector('button').addEventListener('click', () => {
        if(questionNumber <= questionTotal){
            genererateQuestion(); //On recrée une question
            switchState('question'); //on passe à la question suivante
        }
    });
}

const genererateQuestion = () => {

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

    // Tout ce qui va nous servir à creer la question (un drapeau, un choix de reponse, une bonne reponse)
    const questions = {
        flag: country.flag,  
        answer: country.name,
        possibilities
    }

    return questions;
}

//Passer d'un état à l'autre (question, verification de reponse)
const switchState = (states) =>{
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


// Verifier si c'est la bonne reponse
const checkAnswer = (userAnswer) => {
    // si oui alors bonne reponse
    if(userAnswer === questions.answer){
        state.answer.querySelector('h2').innerHTML ='Bonne réponse';
        state.answer.querySelector('p').innerHTML ='';
    }else{
        // si non alors mauvais reponse
        state.answer.querySelector('h2').innerHTML ='Mauvaise réponse';
        state.answer.querySelector('p').innerHTML =`La réponse était : ${questions.answer}`; 

    }
    questionNumber++; 
    //afficher la reponse dans state answer
    switchState('answer');
}
