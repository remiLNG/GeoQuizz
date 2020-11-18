// Variables globales

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
            state.end.querySelector('p').innerHTML = 'Your score is:' + score + '/' + questionTotal;
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
    state.question.querySelector("#suiviQuestion").innerHTML = " Question " + questionNumber + " / " + questionTotal;

    //Aficher la question
    state.question.querySelector("#questionTitle").innerHTML = " Quel est le drapeau de ce pays ?"
    state.question.querySelector("#pays").innerHTML = questions.pays

    // Afficher les reponses
    state.question.querySelector("#flag1").setAttribute("src", questions.possibilities[0]);
    state.question.querySelector("#flag2").setAttribute("src", questions.possibilities[1]);
    state.question.querySelector("#flag3").setAttribute("src", questions.possibilities[2]);
    state.question.querySelector("#flag4").setAttribute("src", questions.possibilities[3]);
}


const createQuestion = (countries) => {
    const random = parseInt(Math.random() * countries.length);

    // Pays aleatoire parmis la liste
    const country = countries[random];

    var possibilities = [];

    //On affiche 3 drapeaux aléatoires
    while (possibilities.length < 3) {
        var r;
        var flag1;
        var flag2;
        var flag3;
        if (flag1 == null) {
            r = parseInt(Math.random() * countries.length)
            flag1 = countries[r].flag;
            possibilities.push(flag1);
        } else if (flag2 == null) {
            r = parseInt(Math.random() * countries.length)
            flag2 = countries[r].flag;
            possibilities.push(flag2)
        } else if (flag3 == null) {
            r = parseInt(Math.random() * countries.length)
            flag3 = countries[r].flag;
            possibilities.push(flag3)
        }

    }
    possibilities.push(country.flag) //on ajoute le bon drapeau


    // On tri aléatoirement notre tableau qui contient les drapeaux
    function randomize(tab) {
        var i, j, tmp;
        for (i = tab.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = tab[i];
            tab[i] = tab[j];
            tab[j] = tmp;
        }
        return tab;
    }
    possibilities = randomize(possibilities)


    // Tout ce qui va nous servir à creer la question 
    const questions = {
        pays: country.translations.fr,  //Pays en question
        possibilities, //Les choix de reponses
        answer: country.flag  //bonne reponse
    }

    return questions;
}


//Passer d'un état à l'autre (question, verification de reponse)
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

const getAnswer = () => {
    var userAnswer = "";
    state.question.querySelector('#flag1').addEventListener('click', function () {
        userAnswer = questions.possibilities[0];
        checkAnswer(userAnswer)
    })
    state.question.querySelector('#flag2').addEventListener('click', function () {
        userAnswer = questions.possibilities[1]
        checkAnswer(userAnswer)

    })
    state.question.querySelector('#flag3').addEventListener('click', function () {
        userAnswer = questions.possibilities[2]
        checkAnswer(userAnswer)
    })
    state.question.querySelector('#flag4').addEventListener('click', function () {
        userAnswer = questions.possibilities[3]
        checkAnswer(userAnswer)
    })
}



// Verifier si c'est la bonne reponse
const checkAnswer = (userAnswer) => {
    // si oui alors bonne reponse
    if (userAnswer === questions.answer) {
        state.answer.querySelector('h2').innerHTML = 'Bonne réponse';
        state.answer.querySelector('p').innerHTML = '';
        state.answer.querySelector('#goodflag').setAttribute("src", '');
        score++;
    } else {
        // si non alors mauvais reponse
        state.answer.querySelector('h2').innerHTML = 'Mauvaise réponse';
        state.answer.querySelector('p').innerHTML = 'La réponse était  : ';
        state.answer.querySelector('#goodflag').setAttribute("src", questions.answer);
    }
    //afficher la reponse dans state answer
    questionNumber++;
    switchState('answer');
}
