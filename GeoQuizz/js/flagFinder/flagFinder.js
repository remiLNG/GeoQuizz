// Variables globales

let state = {
    question: null,
    answer: null,

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
    genererateQuestion();
    getAnswer();

}

//Generer une question
const genererateQuestion = () => {

    questions = createQuestion(countries);

    //Aficher suivi des questions
    state.question.querySelector("#suiviQuestion").innerHTML = " Question " + questionNumber + " / " + questionTotal;

    //Aficher la question
    state.question.querySelector("#questionTitle").innerHTML = " Quel est le drapeau de ce pays ?"
    state.question.querySelector("#pays").innerHTML = questions.pays

    // Afficher les reponses
    state.question.querySelector("#flag").setAttribute("src", questions.possibilities[0]);
    state.question.querySelector("#flag2").setAttribute("src", questions.possibilities[1]);
    state.question.querySelector("#flag3").setAttribute("src", questions.possibilities[2]);
    state.question.querySelector("#flag4").setAttribute("src", questions.possibilities[3]);
}

window.onload = init;


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


    // Tout ce qui va nous servir à creer la question (un drapeau, un choix de reponse, une bonne reponse)
    const questions = {
        pays: country.translations.fr,
        possibilities,
        answer: country.flag
    }

    return questions;
}



//Passer d'un état à l'autre (question, verification de reponse)
const switchState = (states) => {
    switch (states) {
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


const getAnswer = () => {
    var userAnswer = questions.possibilities[0];
    state.question.querySelector('#flag').addEventListener('click', function () {
        if (userAnswer == questions.possibilities[2]) {
            checkAnswer(userAnswer)
        } else
            checkAnswer(userAnswer)
    })
    state.question.querySelector('#flag2').addEventListener('click', function () {
        userAnswer = questions.possibilities[1]
        if (userAnswer == questions.possibilities[1]) {
            checkAnswer(userAnswer)
        } else
            checkAnswer(userAnswer)
    })
    state.question.querySelector('#flag3').addEventListener('click', function () {
        userAnswer = questions.possibilities[2]
        if (userAnswer == questions.possibilities[2]) {
            checkAnswer(userAnswer)
        } else
            checkAnswer(userAnswer)
    })
    state.question.querySelector('#flag4').addEventListener('click', function () {
        userAnswer = questions.possibilities[3]
        if (userAnswer == questions.possibilities[3]) {
            checkAnswer(userAnswer)
        } else
            checkAnswer(userAnswer)
    })

}

// Verifier si c'est la bonne reponse
const checkAnswer = (userAnswer) => {
    // si oui alors bonne reponse
    if (userAnswer === questions.answer) {
        state.answer.querySelector('h2').innerHTML = 'Bonne réponse';
    } else {
        // si non alors mauvais reponse
        state.answer.querySelector('h2').innerHTML = 'Mauvaise réponse';
        state.answer.querySelector('p').innerHTML = 'La réponse était  : ';
        state.answer.querySelector('#goodflag').setAttribute("src", questions.answer);
    }
    //afficher la reponse dans state answer
    switchState('answer');
}


