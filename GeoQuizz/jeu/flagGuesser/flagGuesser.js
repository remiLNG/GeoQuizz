// Variables globales

let state = {
    selectMode: null,
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
let hardmode = true;
let champ = document.getElementById("champ");
let next = document.getElementById("Pass");
let timeBasic = 15
let timeLeft = timeBasic;
let timerstop = true;


let form = document.getElementById("form");

const timeLeftDisplay = document.querySelector('#timer');


function countDown() {
    setInterval(function () {
        if (timerstop) {
            if (timeLeft <= 0 && questionNumber <= questionTotal) {
                clearInterval(timeLeft = 0)
                switchState('answer')
                state.answer.querySelector('h2').style.color = 'red'
                state.answer.querySelector('h2').innerHTML = `Trop tard !`;
                state.answer.querySelector('#bonrep').innerHTML = `La réponse était : <p style="color:green; margin-top:1%">  ${questions.answer} </p>`;
                LOOSE.play();
                questionNumber++;
                timeLeft = 15;
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
            document.getElementById('end').innerHTML += `<p> Votre score est de : ${goodAnswers} / ${questionTotal} ! </p>`
            document.getElementById('end').innerHTML += '<p id="pfin"> <a class ="button2" href="flagguesser">  Rejouer </a> </p>'
            document.getElementById('end').innerHTML += '<p id="pfin"> <a class ="button2" href="menu">  Retour Menu </a> </p>'
            switchState('end');
        }
    });
}

const InputManager = () => {
    champ.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("myBtn").click();
        }
    });
}


const init = async () => {
    state.question = document.querySelector("#question");
    state.answer = document.querySelector("#answer");
    state.end = document.querySelector("#end");
    state.selectMode = document.querySelector("#select");


    // Acces à toutes les informations des pays
    const response = await fetch('/geojson');
    countries = await response.json();


    // Passer la question
    next.addEventListener('click', function () {
        switchState('answer');
        questionNumber++;
        state.answer.querySelector('#bonrep').innerHTML = `La réponse était : <p style="color:green; margin-top:1%">  ${questions.answer} </p>`;
        LOOSE.play();
    })

    switchState('select')

    let btnNormal = document.querySelector("#normal")
    let btnHard = document.querySelector("#hard")
    champ.style.display = 'none';
    next.style.display = 'none'

    btnNormal.addEventListener('click', () => {
        hardmode = false;
        generateQuestion();
        countDown()

    })

    btnHard.addEventListener('click', () => {
        generateQuestion();
        InputManager()
        countDown()
        next.style.display = 'block'
    })
    handleClickChoice();

}



// Cliquer sur une des reponses
const handleClickChoice = () => {
    state.question.querySelector('ul').addEventListener('click', ({ target }) => {
        if (target.matches('a')) {
            const userAnswer = target.innerHTML;
            checkAnswer(userAnswer);
        }
    });
}


//Generer une question
const generateQuestion = () => {

    timerstop = true;
    timeLeft = timeBasic;

    switchState('question')

    questions = createQuestion(countries);

    //Aficher suivi des questions
    state.question.querySelector("p").innerHTML = " Question " + questionNumber + " / " + questionTotal;

    //Afficher la question
    state.question.querySelector("#questionTitle").innerHTML = " A quel pays appartient ce drapeau ?"

    // Afficher un drapeau
    state.question.querySelector("img").setAttribute("src", questions.flag);

    //Ajouter les choix de reponses sur la page
    if (!hardmode) {
        const reponses = questions.possibilities.map((possibility) => {
            return `<a id="response" class="button2 police">${possibility}</a>`;
        });
        state.question.querySelector("ul").innerHTML = reponses.join('');
    } else {
        let ul = document.getElementById("liste")
        ul.style.display = 'none';
    }

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
        case 'select':
            state.selectMode.style.display = 'block';
            state.answer.style.display = 'none';
            state.question.style.display = 'none';
            state.end.style.display = 'none';
            break;
        case 'answer':
            state.answer.style.display = 'block';
            state.question.style.display = 'none';
            state.end.style.display = 'none';
            state.selectMode.style.display = 'none';
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
            state.selectMode.style.display = 'none';
            champ.value = "";
            if (!hardmode) {
                let form = document.getElementById("form")
                form.style.display = 'none'
            } else {
                champ.style.display = 'block'
                let liste = document.getElementById("liste")
                liste.style.display = 'none'
            }
            break;
        default:
            state.answer.style.display = 'none';
            state.question.style.display = 'none';
            state.end.style.display = 'block';
            state.selectMode.style.display = 'none';
            break;
    }
};


// Verifier si c'est la bonne reponse
const checkAnswer = (userAnswer) => {
    var t;
    // si oui alors bonne reponse
    for (var i = 0; i < questions.p2.length; i++) {
        if (userAnswer === questions.p2[i]) {
            t = i;
        }
    }
    if (hardmode == false) {
        if (userAnswer === questions.answer) {
            state.answer.querySelector('h2').style.color = 'green'
            state.answer.querySelector('h2').innerHTML = 'Bonne réponse !';
            state.answer.querySelector('#mauvrep').innerHTML = '';
            state.answer.querySelector("#mauvdrap").setAttribute("src", '');
            state.answer.querySelector('#bonrep').innerHTML = 'Le drapeau est bien celui de ce pays : ' + questions.answer;
            goodAnswers++;
            WIN.play();
        } else {
            // si non alors mauvais reponse
            state.answer.querySelector('h2').style.color = 'red'
            state.answer.querySelector('h2').innerHTML = `Mauvaise réponse !`;
            state.answer.querySelector('#mauvrep').innerHTML = `Vous avez répondu ${userAnswer} qui a pour drapeau :`;
            state.answer.querySelector("#mauvdrap").setAttribute("src", questions.p[t]);
            state.answer.querySelector('#bonrep').innerHTML = `La réponse était : <p style="color:green; margin-top:1%">  ${questions.answer} </p>`;
            LOOSE.play();
        }
    } else {
        if (champ.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") == questions.answer.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
            state.answer.querySelector('h2').style.color = 'green'
            state.answer.querySelector('h2').innerHTML = 'Bonne réponse !';
            state.answer.querySelector('#mauvrep').innerHTML = '';
            state.answer.querySelector("#mauvdrap").setAttribute("src", '');
            state.answer.querySelector('#bonrep').innerHTML = 'Le drapeau est bien celui de ce pays : ' + questions.answer;
            goodAnswers++;
            WIN.play();
        }

        else {
            state.answer.querySelector('h2').style.color = 'red'
            state.answer.querySelector('h2').innerHTML = `Mauvaise réponse !`;
            state.answer.querySelector('#mauvrep').innerHTML = `Vous avez répondu ${champ.value}`;
            state.answer.querySelector('#bonrep').innerHTML = `La réponse était : <p style="color:green; margin-top:1%">  ${questions.answer} </p>`;
            LOOSE.play();
        }
    }
    questionNumber++;
    //afficher la reponse dans state answer
    switchState('answer');
}
