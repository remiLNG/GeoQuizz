var map = document.querySelector('#map')
var paths = document.querySelectorAll('.map__image a')
var depts = []
var responses = []
var question = ''
var questionNumber = 1;
var totalQuestion = 3;
var fails = 2;
var score = 0;
//Variable empéchant de spam la carte de mauvaise réponse
var repValide = false;
//Variable empéchant de valider une réponse quand la réponse est donné aprés les 3 essaie
var finquestion = false;

paths.forEach(function (path) {
    depts.push(path.id);
    path.addEventListener('click', function (e) {
        checkAnswer(e.path[1].id)
    })
})


const init = async () => {
    let next = document.getElementById('next');
    next.addEventListener('click', function () {
        questionNumber++;
        if (questionNumber > totalQuestion) {
            displayScore();
        } else {
            generateQuestion();
        }
    })


    generateQuestion()
}

window.onload = init;

const generateQuestion = () => {
    fails = 2;
    responses = [];
    if (document.getElementById("pass") !== null) {
        document.getElementById("pass").parentNode.removeChild(document.getElementById("pass"))
    }
    if (questionNumber >= 1) {
        paths.forEach(element => {
            element.children[0].style.fill = 'darkslateblue';
        });
    }
    document.getElementById('next').style.display = 'block'
    document.getElementById('map__image').style.display = 'block'
    question = createQuestion(depts)
    myDiv = document.getElementById('question');
    if (document.contains(document.getElementById("questionState"))) {
        document.getElementById("questionState").parentNode.removeChild(document.getElementById("questionState"))
        document.getElementById("questionText").parentNode.removeChild(document.getElementById("questionText"))
    }
    h1 = document.createElement('h1');
    h1.id = "questionState";
    h1.innerHTML = "Question : " + questionNumber + "/" + totalQuestion;
    h2 = document.createElement('h2');
    h2.innerHTML = "Où se trouve le departement : " + question;
    h2.id = "questionText";
    myDiv.appendChild(h1);
    myDiv.appendChild(h2);
    updateFails();
}

const updateFails = () => {
    if (document.contains(document.getElementById("fail"))) {
        document.getElementById("fail").parentNode.removeChild(document.getElementById("fail"))
    }
    let currDiv = document.getElementById('question');
    let failslist = document.createElement('p');
    failslist.id = "fail";
    failslist.innerHTML = 'Il vous reste ' + (fails + 1) + ' essais';
    currDiv.appendChild(failslist);
}

const createQuestion = (questions) => {
    let random = parseInt(Math.random() * questions.length);

    const dept = questions[random];
    repValide = false;
    finquestion = false;
    return dept
    
}

const checkAnswer = (userChoice) => {
    if (userChoice == question) {
        //Dans le cas d'une bonne reponse
        if (!repValide && !finquestion) {
            repValide = true;
            document.getElementById(userChoice).children[0].style.fill = "green"
            score++;
            questionNumber++;
            fails = 0;
        }

        if (questionNumber > totalQuestion) {
            displayScore();
        } else {
            document.getElementById("next").style.display = 'none'
            myDiv = document.getElementById("map");
            nextQuestion = document.createElement('a');
            nextQuestion.innerHTML = "Question Suivante";
            nextQuestion.id = "pass"
            nextQuestion.addEventListener('click', function () {
                if (questionNumber > totalQuestion) {
                    displayScore();
                } else {
                    generateQuestion();
                }
            })
            nextQuestion.className += "button2";
            if (!(document.contains(document.getElementById("pass")))) {
                myDiv.appendChild(nextQuestion);
            }
        }
    } else {
        if (!(responses.includes(userChoice))) {
            responses.push(userChoice);
            if (fails >= 0) {
                if (fails == 0) {
                    if (!(document.getElementById(question).children[0].style.fill == "green")) {
                        document.getElementById(userChoice).children[0].style.fill = "red"
                    }
                    //nombre de tentatives depassees : on propose de passer a la question suivante.
                   
                    finquestion = true;
                    fail = document.getElementById("fail");
                    fail.innerHTML = 'Vous n\'avez plus d\'essai';

                    document.getElementById("next").style.display = 'none'
                    document.getElementById(question).children[0].style.fill = "green"
                    myDiv = document.getElementById("map");
                    nextQuestion = document.createElement('a');
                    nextQuestion.innerHTML = "Question Suivante";
                    nextQuestion.id = "pass"
                    if (!(document.contains(document.getElementById("pass")))) {
                        nextQuestion.addEventListener('click', function () {
                            questionNumber++;
                            if (questionNumber > totalQuestion) {
                                displayScore();
                            } else {
                                generateQuestion();
                            }
                        })
                        nextQuestion.className += "button2";
                        myDiv.appendChild(nextQuestion);
                    }
                }
                else {
                    document.getElementById(userChoice).children[0].style.fill = "red"
                    fails--;
                    updateFails()
                }
            }
        }
    }
}

const displayScore = () => {
    document.getElementById("fail").style.display = 'none'
    document.getElementById("map").style.display = 'none'
    document.getElementById("next").style.display = 'none'
    document.getElementById("questionState").style.display = 'none'
    document.getElementById("questionText").style.display = 'none'
    myDiv = document.getElementById("question")
    endTitle = document.createElement("h1")
    endTitle.innerHTML = "La partie est finie !"
    scoreResult = document.createElement("h2")
    scoreResult.innerHTML = "Votre score est : " + score + "/" + totalQuestion;
    playAgain = document.createElement('a');
    playAgain.innerHTML = "Rejouer";
    playAgain.id = "playAgain";
    playAgain.className += "button2";
    playAgain.href = "/deptGuesser"
    menuBtn = document.createElement('a');
    menuBtn.innerHTML = "Retour au menu";
    menuBtn.id = "menuBtn";
    menuBtn.className += "button2";
    menuBtn.href = "/menu"
    myDiv.appendChild(endTitle);
    myDiv.appendChild(scoreResult);
    myDiv.appendChild(playAgain);
    myDiv.appendChild(menuBtn);
}