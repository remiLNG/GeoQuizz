// Variables globales

let state = {
    selectMode: null,
    question: null,
    answer: null,
    end: null,
}

let countries = [];
let questions = {};
let questionNumber = 1;
let questionTotal = 3;
let score = 0;
let userAnswerE = [];
let rep;
let rep2;
let paysQuestion = [];
let hardmode = true;
let listHard = [];




function createButton($class, $text) {
    var myDiv = document.getElementById("answer");
    // On créer le bouton  
    var button = document.createElement('BUTTON');
    // Texte du bouton
    var text = document.createTextNode($text);
    //Type du bouton
    button.id = "lol"
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
            document.getElementById('end').innerHTML += `<p> Votre score est de : ${score} / ${questionTotal} </p>`
            document.getElementById('end').innerHTML += '<p id="pfin"> <a class ="button2" href="menu">  Retour Menu </a> </p>'
            switchState('end');
        }
    });
}



const init = async () => {
    state.selectMode = document.querySelector("#select");
    state.question = document.querySelector("#question");
    state.answer = document.querySelector("#answer");
    state.end = document.querySelector("#end");

    // Acces à toutes les informations des pays
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    countries = await response.json();

    listHard = [[countries[184], countries[46], countries[5], countries[146]],
    [countries[105], countries[147], countries[178], countries[202]],
    [countries[130], countries[157], countries[185], countries[174]],
    [countries[109], countries[112], countries[106], countries[144]],
    [countries[204], countries[205], countries[174], countries[199]],
    [countries[68], countries[160], countries[100], countries[92]],
    [countries[51], countries[66], countries[243], countries[11]],
    [countries[94], countries[137], countries[41], countries[198]],
    [countries[142], countries[200], countries[45], countries[52]],
    [countries[53], countries[54], countries[223], countries[154]],
    [countries[214], countries[116], countries[120], countries[237]],
    [countries[247], countries[220], countries[108], countries[67]],
    [countries[135], countries[126], countries[239], countries[58]],
    [countries[222], countries[107], countries[37], countries[102]],
    [countries[26], countries[85], countries[129], countries[153]],
    [countries[77], countries[157], countries[130], countries[185]],
    [countries[130], countries[157], countries[174], countries[57]],
    [countries[13], countries[159], countries[234], countries[55]],
    [countries[163], countries[75], countries[24], countries[234]],
    [countries[75], countries[13], countries[24], countries[159]],
    [countries[10], countries[68], countries[160], countries[100]]];


    let btnNormal = document.querySelector("#normal")
    let btnHard = document.querySelector("#hard")

    btnNormal.addEventListener('click', () => {
        hardmode = false;
        genererateQuestion();

    })
    btnHard.addEventListener('click', () => {
        genererateQuestion();
    })

    getAnswer();
}

window.onload = init;


//Generer une question
const genererateQuestion = () => {

    switchState('question')

    questions = createQuestion(countries, listHard);

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


const createQuestion = (countries, listHard) => {
    var country;
    if (hardmode) {
        //On récupere une liste aléatoire de drapeaux dans la liste de question
        var random = parseInt(Math.random() * listHard.length);
        var rand1sur4 = parseInt(Math.random() * 4);

        var tmp = listHard[random]
        //Dans cette liste on choisit un des drapeux qui sera la bonne réponse
        const counttemp = listHard[random];
        country = counttemp[rand1sur4];
        userAnswerE.push(country);

        //On crée en ajoute a possibilities pour ne pas a voir a changer le reste de la fonction
        var possibilities = [];
        for (let i = 0; i < 4; i++) {
            if (country != tmp[i]) {
                possibilities.push(tmp[i].flag);
                userAnswerE.push(tmp[i]);
            }
        }
        possibilities.push(country.flag);
        rep2 = country.translations.fr;
    }
    else {

        var random = parseInt(Math.random() * countries.length);

        // Pays aleatoire parmis la liste
        while (paysQuestion.includes(countries[random])) {
            random = parseInt(Math.random() * countries.length);
            console.log("dejavu")
        }
        paysQuestion.push(countries[random]);
        country = countries[random];

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
    }

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
            state.selectMode.style.display = 'none';
            if(state.answer.contains(document.getElementById('lol'))){
               
            }else{
                createButton('btn btn-primary', 'Question suivante')
            }
            break;
        case 'select':
            state.selectMode.style.display = 'block';
            state.answer.style.display = 'none';
            state.question.style.display = 'none';
            state.end.style.display = 'none';
            break;
      
        case 'question':
            state.answer.style.display = 'none';
            state.question.style.display = 'block';
            state.end.style.display = 'none';
            state.selectMode.style.display = 'none';
            break;
        default:
            state.answer.style.display = 'none';
            state.selectMode.style.display = 'none';
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
    for (var i = 0; i < questions.choix.length; i++) {
        console.log(userAnswer)
        if (userAnswer === questions.choix[i].flag) {
            rep = questions.choix[i].translations.fr;
        }
    }
    // si oui alors bonne reponse
    if (userAnswer === questions.answer) {
        state.answer.querySelector('h2').style.color = 'green'
        state.answer.querySelector('h2').innerHTML = 'Bonne réponse';
        state.answer.querySelector('#mauvaiserep').innerHTML = '';
        state.answer.querySelector('#rep').innerHTML = '';
        state.answer.querySelector('#bonrep').innerHTML = 'C' + 'est bien le drapeau de le/la ' + rep2;
        state.answer.querySelector('#goodflag').setAttribute("src", questions.answer);
        score++;
        WIN.play();
    } else {
        // si non alors mauvais reponse
        state.answer.querySelector('h2').style.color = 'red'
        state.answer.querySelector('h2').innerHTML = 'Mauvaise réponse';
        state.answer.querySelector('#mauvaiserep').innerHTML = `Vous avez répondu ${rep}`;
        state.answer.querySelector('#rep').innerHTML = 'Alors que le drapeau de le/la ' + rep2 + ' est celui là :';
        state.answer.querySelector('#bonrep').innerHTML = '';
        state.answer.querySelector('#goodflag').setAttribute("src", questions.answer);
        LOOSE.play();
    }
    //afficher la reponse dans state answer
    questionNumber++;
    switchState('answer');
}
