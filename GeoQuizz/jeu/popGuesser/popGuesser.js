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
let timeBasic = 15
let timeLeft = timeBasic;
let timerstop = true;

const timeLeftDisplay = document.querySelector('#timer');


function countDown() {
    setInterval(function () {
        if (timerstop) {
            if (timeLeft <= 0 && questionNumber <= questionTotal) {
                clearInterval(timeLeft = 0)
                switchState('answer')
                questionNumber++;
                timeLeft = timeBasic;
                state.answer.querySelector('h2').style.color = 'red';
                state.answer.querySelector('h2').innerHTML = 'Trop tard !';
                state.answer.querySelector('p').innerHTML = 'Avec ' + questions.answer + ' habitants le/la ' + questions.pays + ' est plus peuplé que le/la ' + questions.fauxpays + ' avec ' + questions.fauxpop + ' habitants.';
                LOOSE.play();
            }
            timeLeftDisplay.innerHTML = timeLeft
            timeLeft -= 1
        }
    }, 1000)
}




function createButton($class, $text, $id) {
    var myDiv = document.getElementById("answer");
    // On créer le bouton  
    var button = document.createElement('a');
    // Texte du bouton
    var text = document.createTextNode($text);
    // Classe du bouton
    if (!($class === undefined)) {
        button.className += $class;
    }
    // ID du bouton
    if (!($id === undefined)) {
        button.id += $id;
    }
    // appending text to button
    button.appendChild(text);
    // appending button to div 
    myDiv.appendChild(button);

    button.addEventListener('click', () => {
        if (questionNumber <= questionTotal) {
            generateQuestion(); //On recrée une question
            switchState('question'); //on passe à la question suivante
        } else { //Si il n'y en a plus alors on affiche le score dans le end state
            document.getElementById('end').innerHTML += `<p> Votre score est de : ${score} / ${questionTotal} ! </p>`
            document.getElementById('end').innerHTML += '<p id="pfin"> <a class ="button2" href="popguesser">  Rejouer </a> </p>'
            document.getElementById('end').innerHTML += '<p id="pfin"> <a class ="button2" href="menu">  Retour Menu </a> </p>'
            switchState('end');
        }
    });
}



const init = async () => {
    state.question = document.querySelector("#question");
    state.answer = document.querySelector("#answer");
    state.end = document.querySelector("#end");

    // Acces à toutes les informations des pays
    const response = await fetch('/geojson');
    countries = await response.json()


    generateQuestion();
    getAnswer();
    countDown();

}

window.onload = init;


//Generer une question
const generateQuestion = () => {
    timerstop = true;
    timeLeft = timeBasic;
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

    let random = 0;
    let random2 = 0;

    do {
        random = parseInt(Math.random() * countries.length);
        random2 = parseInt(Math.random() * countries.length);
    } while (random == random2);

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

    if (country.population > country2.population) {
        repPop = country.population;
        repNom = country.translations.fr;
        fauxPop = country2.population;
        fauxNom = country2.translations.fr;
    } else {
        repPop = country2.population;
        repNom = country2.translations.fr;
        fauxPop = country.population;
        fauxNom = country.translations.fr;
    }

    const questions = {
        pays: repNom,  //Pays en question
        fauxpays: fauxNom,
        possibilities, //Les choix de reponses
        answer: repPop,//bonne reponse
        fauxpop: fauxPop
    }

    console.log(questions.possibilities[0])
    console.log(questions.possibilities[1])

    return questions;
}



//Passer d'un état à l'autre (question, verification de reponse)
const switchState = (states) => {
    switch (states) {
        case 'answer':
            state.answer.style.display = 'block';
            state.question.style.display = 'none';
            state.end.style.display = 'none';
            if (state.answer.contains(document.getElementById('questionSuivante'))) {
            }
            else {
                createButton('button2', 'Question suivante', 'questionSuivante')
            }
            timerstop = false;
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
    state.question.querySelector('#drapeau1').addEventListener('click', function () {
        userAnswer = questions.possibilities[0].population;
        checkAnswer(userAnswer)
    })
    state.question.querySelector('#pays1').addEventListener('click', function () {
        userAnswer = questions.possibilities[0].population;
        checkAnswer(userAnswer)
    })
    state.question.querySelector('#drapeau2').addEventListener('click', function () {
        userAnswer = questions.possibilities[1].population;
        checkAnswer(userAnswer)
    })
    state.question.querySelector('#pays2').addEventListener('click', function () {
        userAnswer = questions.possibilities[1].population;
        checkAnswer(userAnswer)
    })
}


// Verifier si c'est la bonne reponse
const checkAnswer = (userAnswer) => {
    // si oui alors bonne reponse
    if (userAnswer === questions.answer) {
        state.answer.querySelector('h2').style.color = 'green'
        state.answer.querySelector('h2').innerHTML = 'Bonne réponse';
        state.answer.querySelector('p').innerHTML = 'Avec ' + questions.answer + ' habitants ce pays : ' + questions.pays + ' est plus peuplé que ce pays : ' + questions.fauxpays + ' qui a ' + questions.fauxpop + ' habitants.';
        score++;
        WIN.play();
    } else {
        // si non alors mauvais reponse
        state.answer.querySelector('h2').style.color = 'red'
        state.answer.querySelector('h2').innerHTML = 'Mauvaise réponse';
        state.answer.querySelector('p').innerHTML = 'Avec ' + questions.answer + ' habitants ce pays : ' + questions.pays + ' est plus peuplé que ce pays : ' + questions.fauxpays + ' qui a ' + questions.fauxpop + ' habitants.';
        LOOSE.play();
    }
    //afficher la reponse dans state answer
    questionNumber++;
    switchState('answer');
}
