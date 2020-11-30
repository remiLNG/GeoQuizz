let state = {
    question: null,
    answer: null,
    end: null,

}

let countries = [];
let questions = {};
let questionNumber = 1;
let questionTotal = 3;
let score = 0;

function createButton($class, $text) {
    var myDiv = document.getElementById("answer");
    // On créer le bouton  
    var button = document.createElement('BUTTON');
    // Texte du bouton
    var text = document.createTextNode($text);
    //Type du bouton
    button.type = 'button'
    //classe du bouton
    button.className += $class;
    // appending text to button 
    button.appendChild(text);
    // appending button to div 
    myDiv.appendChild(button);

    button.addEventListener('click', () => {
        if (questionNumber <= questionTotal) {
            genererateQuestion(); //On recrée une question
            switchState('question'); //on passe à la question suivante

        } else { //Si il n'y en a plus alors on affiche le score dans le end state
            state.end.querySelector('p').innerHTML = 'Votre score est:' + score + '/' + questionTotal;
            state.end.querySelector('a').innerHTML += '<button class="btn btn-primary"> Retour Menu </button>'
            switchState('end');
        }
    });
}

const init = async () => {
    state.question = document.querySelector("#question");
    state.answer = document.querySelector("#answer");
    state.end = document.querySelector("#end");

    // Acces à toutes les informations des pays
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    countries = await response.json();

    genererateQuestion();
    getAnswer();

}

window.onload = init;


//Generer une question
const genererateQuestion = () => {

    questions = createQuestion(countries);

    //Aficher suivi des questions
    state.question.querySelector("#nbquestion").innerHTML = " Question " + questionNumber + " / " + questionTotal;

    //Aficher la question
    state.question.querySelector("#questions").innerHTML = " Lequel de ces pays a le plus de population ? "
    


    // Afficher les reponses
    state.question.querySelector("#pays1").innerHTML = questions.possibilities[0].translations.fr;
    state.question.querySelector("#pays2").innerHTML = questions.possibilities[1].translations.fr;
    state.question.querySelector("#drapeau1").setAttribute("src", questions.possibilities[0].flag);
    state.question.querySelector("#drapeau2").setAttribute("src", questions.possibilities[1].flag);
    
    console.log(questions.possibilities[0])
    console.log(questions.possibilities[1])
}



const createQuestion = (countries) => {

    const random = parseInt(Math.random() * countries.length);
    const random2 = parseInt(Math.random() * countries.length);

    // Pays aleatoire parmis la liste
    const country = countries[random];
    const country2 = countries[random2];

    var possibilities = [];

    possibilities.push(country);
    possibilities.push(country2);

    var repPop
    var repNom 
    var fauxPop
    var fauxNom

    if(country.population > country2.population){
        repPop = country.population;
        repNom = country.translations.fr;
        fauxPop = country2.population;
        fauxNom = country2.translations.fr;
    }else{
        repPop = country2.population;
        repNom = country2.translations.fr;
        fauxPop = country.population;
        fauxNom = country.translations.fr;
    }

    const questions = {
        pays: repNom,  //Pays en question
        fauxpays : fauxNom,
        possibilities, //Les choix de reponses
        answer:  repPop,//bonne reponse
        fauxpop: fauxPop
    }
    
    console.log(questions.possibilities[0])
    console.log(questions.possibilities[1])

    return questions;
}

const switchState = (states) => {
    switch (states) {
        case 'answer':
            state.answer.style.display = 'block';
            state.question.style.display = 'none';
            state.end.style.display = 'none';
            if (state.answer.contains(document.querySelector('button'))) {
            }
            else {
                createButton('btn btn-primary', 'Question suivante')
            }
            break;
        case 'question':
            state.answer.style.display = 'none';
            state.question.style.display = 'block';
            state.end.style.display = 'none';
            break;
        default:
            state.answer.style.display = 'none';
            state.question.style.display = 'none';
            state.end.style.display = 'block';
            break;
    }
}