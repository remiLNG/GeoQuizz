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
let score = 0;
let userAnswerD = [];
let rep;
let rep2;
let timeBasic = 15;
let timeLeft = timeBasic;
let hardmode = true;
let champ = document.getElementById("champ");
let next = document.getElementById("Pass");
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
                state.answer.querySelector('h2').style.color = 'red'
                state.answer.querySelector('h2').innerHTML = `Trop tard !`;
                state.answer.querySelector('#bonrep').innerHTML = `La réponse était : <p style="color:green; margin-top:1%">  ${questions.cap} </p>`;
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
            document.getElementById('end').innerHTML += '<p id="pfin"> <a id="rejouer" class ="button2" href="capitalcity">  Rejouer </a> </p>'
            document.getElementById('end').innerHTML += '<p id="pfin"> <a id="retournmenu" class ="button2" href="menu">  Retour Menu </a> </p>'
            switchState('end');
        }
    });
}



const InputManager = () => {
    champ.style.display = 'block';
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
    countries = await response.json()

    // Passer la question
    next.addEventListener('click', function () {
        switchState('answer');
        questionNumber++;
        state.answer.querySelector('#bonrep').innerHTML = `La réponse était : <p style="color:green; margin-top:1%">  ${questions.cap} </p>`;
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
        handleClickChoice();
    })

    btnHard.addEventListener('click', () => {
        generateQuestion();
        InputManager()
        countDown()
        next.style.display = 'block'
    })

}

window.onload = init;



// Cliquer sur une des reponses
const handleClickChoice = () => {
    if (!hardmode) {
        state.question.querySelector('ul').addEventListener('click', ({ target }) => {
            if (target.matches('a')) {
                const userAnswer = target.innerHTML;
                checkAnswer(userAnswer);
            }
        });
    }
}


const generateQuestion = () => {

    switchState('question')
    timerstop = true;
    timeLeft = timeBasic;

    questions = createQuestion(countries);

    // Afficher suivi des questions
    state.question.querySelector("p").innerHTML = " Question " + questionNumber + " / " + questionTotal;

    // Afficher la question
    state.question.querySelector("#questionTitle").innerHTML = "Quel est la capitale de ce pays ?";
    state.question.querySelector("#pays").innerHTML = questions.pays;

    //Ajouter les choix de reponses sur la page
    if (!hardmode) {
        const reponses = questions.possibilities.map((possibility) => {
            return `<a id="response" class="button2 police">${possibility}</a>`;
        });
        state.question.querySelector("ul").innerHTML = reponses.join('');
    }

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
    for (var i = 0; i < questions.choix.length; i++) {
        console.log(userAnswer)
        if (userAnswer === questions.choix[i].capital) {
            rep = questions.choix[i].capital;
            rep2 = questions.choix[i].translations.fr;
        }
    }
    // si oui alors bonne reponse
    if (hardmode == false) {
        if (userAnswer === questions.cap) {
            state.answer.querySelector('h2').style.color = 'green'
            state.answer.querySelector('h2').innerHTML = 'Bonne réponse !';
            state.answer.querySelector('h3').innerHTML = "La capitale de ce pays : " + questions.pays + " est bien  " + questions.cap + " !";
            state.answer.querySelector('p').innerHTML = '';
            score++;
            WIN.play();
        } else {
            // si non alors mauvais reponse
            state.answer.querySelector('h2').style.color = 'red'
            state.answer.querySelector('h2').innerHTML = 'Mauvaise réponse !';
            state.answer.querySelector('h3').innerHTML = "";
            state.answer.querySelector('p').innerHTML = "Et non ! Vous avez répondu " + rep + " qui est la capitale de " + rep2 + " <br><br> Alors que la capitale de " + questions.pays + " est  " + questions.cap + ' !';
            LOOSE.play();
        }
    } else {
        if (champ.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") == questions.cap.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
            state.answer.querySelector('h2').style.color = 'green'
            state.answer.querySelector('h2').innerHTML = 'Bonne réponse !';
            state.answer.querySelector('h3').innerHTML = "La capitale de ce pays : " + questions.pays + " est bien  " + questions.cap + " !";
            state.answer.querySelector('p').innerHTML = '';
            score++;
            WIN.play();
        } else {
            state.answer.querySelector('h2').style.color = 'red'
            state.answer.querySelector('h2').innerHTML = `Mauvaise réponse !`;
            state.answer.querySelector('h3').innerHTML = "";
            state.answer.querySelector('#mauvrep').innerHTML = `Vous avez répondu ${champ.value}`;
            state.answer.querySelector('#bonrep').innerHTML = `La réponse était : <p style="color:green; margin-top:1%">  ${questions.cap} </p>`;
            LOOSE.play();
        }
    }
    questionNumber++;
    //afficher la reponse dans state answer
    switchState('answer');
}
