// Variables globales

let state = {
    question: null,
    answer: null,
    end: null,

}

let countries = [];
let questions = {};
let questionNumber = 1;
let questionTotal = 100;
let score = 0;
let userAnswerE = [];
let rep;
let rep2;
let paysQuestion = [];



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
            document.getElementById('end').innerHTML += `<p> Votre score est: ${goodAnswers} / ${questionTotal} </p>`
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
    var random = parseInt(Math.random() * countries.length);

    // Pays aleatoire parmis la liste
    while(paysQuestion.includes(countries[random])){
        console.log(countries[random])
        random = parseInt(Math.random() * countries.length);
        console.log("dejavu")
    }
    paysQuestion.push(countries[random]);
    const country = countries[random];
    console.log(paysQuestion)

    var possibilities = [];

    //On affiche 3 drapeaux aléatoires
    while (possibilities.length < 3) {
        var r;
        var flag1;
        var flag2;
        var flag3;
        if (flag1 == null) {
            r = parseInt(Math.random() * countries.length)
            while (countries[r].flag == country.flag) {
                r = parseInt(Math.random() * countries.length);
                console.log("doublon")
            }
            flag1 = countries[r].flag;
            userAnswerE.push(countries[r])
            possibilities.push(flag1);
        } else if (flag2 == null) {
            r = parseInt(Math.random() * countries.length)
            while (countries[r].flag == country.flag || countries[r].flag == flag1) {
                r = parseInt(Math.random() * countries.length);
                console.log("doublon")
            }
            flag2 = countries[r].flag;
            userAnswerE.push(countries[r])
            possibilities.push(flag2)
        } else if (flag3 == null) {
            r = parseInt(Math.random() * countries.length)
            while (countries[r].flag == country.flag || countries[r].flag == flag1 || countries[r].flag == flag2) {
                r = parseInt(Math.random() * countries.length);
                console.log("doublon")
            }
            flag3 = countries[r].flag;
            userAnswerE.push(countries[r])
            possibilities.push(flag3)
        }

    }
    userAnswerE.push(countries[r])
    rep2 = country.translations.fr;
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
        answer: country.flag,  //bonne reponse
        choix: userAnswerE
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
    console.log(questions.choix)
    for (var i = 0; i < questions.choix.length; i++) {
        console.log(userAnswer)
        if (userAnswer === questions.choix[i].flag) {
            rep = questions.choix[i].translations.fr;
            console.log(rep)
        }
    }
    // si oui alors bonne reponse
    if (userAnswer === questions.answer) {
        state.answer.querySelector('h2').style.color = 'green'
        state.answer.querySelector('h2').innerHTML = 'Bonne réponse';
        state.answer.querySelector('#mauvaiserep').innerHTML = '';
        state.answer.querySelector('#rep').innerHTML = '';
        state.answer.querySelector('#bonrep').innerHTML = 'C' + 'est bien le drapeau de le/la '+ rep2;
        state.answer.querySelector('#goodflag').setAttribute("src", questions.answer);
        score++;
        WIN.play();
    } else {
        // si non alors mauvais reponse
        state.answer.querySelector('h2').style.color = 'red'
        state.answer.querySelector('h2').innerHTML = 'Mauvaise réponse';
        state.answer.querySelector('#mauvaiserep').innerHTML = `Vous avez répondu ${rep}`;
        state.answer.querySelector('#rep').innerHTML = 'Alors que le drapeau de le/la ' + rep2 + ' est celui là :';
        state.answer.querySelector('#goodflag').setAttribute("src", questions.answer);
        LOOSE.play();
    }
    //afficher la reponse dans state answer
    questionNumber++;
    switchState('answer');
}
