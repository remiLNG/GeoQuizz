// Variables globales

let state = {
    question: null,
    answer: null,
    end: null
}

let countries = [];
let questions = {};
let questionNumber = 1;
let questionTotal = 3;
let goodAnswers = 0;
let userAnswerD;

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
            generateQuestion(); //On recrée une question
            switchState('question'); //on passe à la question suivante
        } else { //Si il n'y en a plus alors on affiche le score dans le end state
            document.getElementById('end').innerHTML += `<p> Votre score est de : ${goodAnswers} / ${questionTotal} </p>`
            document.getElementById('end').innerHTML += '<p id="pfin"> <a class ="button2" href="menu.html">  Retour Menu </a> </p>'
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

    generateQuestion();
    handleClickChoice();
}




// Cliquer sur une des reponses
const handleClickChoice = () => {
    state.question.querySelector('ul').addEventListener('click', ({ target }) => {
        if (target.matches('li')) {
            const userAnswer = target.innerHTML;
            checkAnswer(userAnswer);
        }
    });
}


//Generer une question
const generateQuestion = () => {

    questions = createQuestion(countries);

    //Aficher suivi des questions
    state.question.querySelector("p").innerHTML = " Question " + questionNumber + " / " + questionTotal;

    //Afficher la question
    state.question.querySelector("#questionTitle").innerHTML = " A quel pays appartient ce drapeau ?"

    // Afficher un drapeau
    state.question.querySelector("img").setAttribute("src", questions.flag);

    //Ajouter les choix de reponses sur la page
    const reponses = questions.possibilities.map((possibility) => {
        return `<li id="response" class="btnanswer police">${possibility}</li>`;
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
    const p = [];
    const p2 = [];

    while (possibilities.length < 3) { //On affiche 3 reponses random
        const r = parseInt(Math.random() * countries.length);
        const name = countries[r].translations.fr;
        const test = countries[r].flag;
        const test2 = countries[r].translations.fr;
        if (!possibilities.includes(name) && name != country.translations.fr) {
            possibilities.push(name);
            p.push(test);
            p2.push(test2)
        }
        else {
            console.log("doublon")
        }

    }
    

    possibilities.push(country.translations.fr); //on ajoute la bonne reponse
    p.push(country.flag);
    p2.push(country.translations.fr);
    possibilities.sort((a, b) => { //on tri la liste des reponses
        return a.charCodeAt(0) - b.charCodeAt(0);
    });


    // Tout ce qui va nous servir à creer la question (un drapeau, un choix de reponse, une bonne reponse)
    const questions = {
        flag: country.flag,
        answer: country.translations.fr,
        possibilities,
        p,
        p2
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
};


// Verifier si c'est la bonne reponse
const checkAnswer = (userAnswer) => {
    var t;
    // si oui alors bonne reponse
    for(var i = 0;i < questions.p2.length;i++){
        if(userAnswer === questions.p2[i]){
            t = i;
        }   
    }
    if (userAnswer === questions.answer) {
        state.answer.querySelector('h2').style.color = 'green'
        state.answer.querySelector('h2').innerHTML = 'Bonne réponse !';
        state.answer.querySelector('p').innerHTML = '';
        goodAnswers++;
    } else {
        // si non alors mauvais reponse
        state.answer.querySelector('h2').style.color = 'red'
        state.answer.querySelector('h2').innerHTML = `Mauvaise réponse !`;
        state.answer.querySelector('#mauvrep').innerHTML = `Vous avez répondu ${userAnswer} qui a pour drapeau:`;
        state.answer.querySelector("#mauvdrap").setAttribute("src",questions.p[t]);
        state.answer.querySelector('#bonrep').innerHTML = `La réponse était : ${questions.answer}`;
    
    }
    questionNumber++;
    //afficher la reponse dans state answer
    switchState('answer');
}
