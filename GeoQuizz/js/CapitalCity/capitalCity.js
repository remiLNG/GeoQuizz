let state = {
    question: null,
    answer:null,
    end: null
}

let countries = [];
let questions = {};
let questionNumber = 1;
let questionTotal = 3;
let score = 0;
let userAnswerD = [];
let rep;
let rep2;
let timeLeft = 15;

const timeLeftDisplay = document.querySelector('#timer');


function countDown(){
    setInterval(function(){
        if(timeLeft <= 0) {
            clearInterval(timeLeft =0)
            switchState('answer')
            questionNumber++;
            timeLeft = 15;
        }
        timeLeftDisplay.innerHTML = timeLeft
        timeLeft -= 1    
    },1000)
}

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
            document.getElementById('end').innerHTML += `<p> Votre score est de : ${score} / ${questionTotal} </p>`
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
    
    //Methode pour quand on aura le serveur
    //const geo = require('geo');
    //et rawdata = geo.readFileSync('geo.json');
    //countries = JSON.parse(rawdata);

    generateQuestion();
    handleClickChoice();
    countDown();
}

window.onload = init;



// Cliquer sur une des reponses
const handleClickChoice = () => {
    state.question.querySelector('ul').addEventListener('click', ({ target }) => {
        if (target.matches('li')) {
            const userAnswer = target.innerHTML;
            checkAnswer(userAnswer);
        }
    });
}


const generateQuestion = () => {

    questions = createQuestion(countries);

    // Afficher suivi des questions
    state.question.querySelector("p").innerHTML = " Question " + questionNumber + " / " + questionTotal;

    // Afficher la question
    state.question.querySelector("#questionTitle").innerHTML = "Quel est la capitale de ce pays ?";
    state.question.querySelector("#pays").innerHTML = questions.pays;

    //Ajouter les choix de reponses sur la page
    const reponses = questions.possibilities.map((possibility) => {
        return `<li id="response" class="btnanswer police">${possibility}</li>`;
    });
    state.question.querySelector("ul").innerHTML = reponses.join('');

}


const createQuestion = (countries) => {
    let random = parseInt(Math.random() * countries.length);


    // Pays aleatoire parmis la liste
    while (countries[random].capital == "") {
        random = parseInt(Math.random() * countries.length);
    }
    const country = countries[random];

    // Liste des reponses
    const possibilities = [];

    while (possibilities.length < 3) { //On affiche 3 reponses random
        let r = parseInt(Math.random() * countries.length);
        while (countries[r].capital == "") {
            r = parseInt(Math.random() * countries.length);
        }
        const capCity = countries[r].capital;
        if (!possibilities.includes(capCity) && capCity != country.capital) {
            possibilities.push(capCity);
            userAnswerD.push(countries[r])
        }
        else {
            console.log("doublon")
        }

    }

    possibilities.push(country.capital); //on ajoute la bonne reponse
    userAnswerD.push(country)
    possibilities.sort((a, b) => { //on tri la liste des reponses
        return a.charCodeAt(0) - b.charCodeAt(0);
    });

    const questions = {
        cap: country.capital,
        pays: country.translations.fr,
        possibilities,
        choix: userAnswerD
    }


    return questions
    

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
    for(var i = 0;i < questions.choix.length ;i++){
        console.log(userAnswer)
        if(userAnswer === questions.choix[i].capital){
             rep = questions.choix[i].capital;
             rep2 = questions.choix[i].translations.fr;
             console.log(rep)
        }   
    }
    // si oui alors bonne reponse
    if (userAnswer === questions.cap) {
        state.answer.querySelector('h2').style.color = 'green'
        state.answer.querySelector('h2').innerHTML = 'Bonne réponse !';
        state.answer.querySelector('h3').innerHTML = "La capitale de " + questions.pays + " est bien  "  + questions.cap + " !";
        state.answer.querySelector('p').innerHTML = '';
        score++;
        WIN.play();
    } else {
        // si non alors mauvais reponse
        state.answer.querySelector('h2').style.color = 'red'
        state.answer.querySelector('h2').innerHTML = 'Mauvaise réponse !';
        state.answer.querySelector('p').innerHTML = "Et non ! Vous avez répondu "+ rep + " qui est la capitale de "+ rep2 +" <br> Alors que la capitale de " +  questions.pays +  " est  " + questions.cap + ' !';
        LOOSE.play();
    }
    questionNumber++;
    //afficher la reponse dans state answer
    switchState('answer');
}
