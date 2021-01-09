var map = document.querySelector('#map')
var paths = document.querySelectorAll('.map__image a')
var depts = []
var responses = []
var question = ''
var questionNumber = 1;
var totalQuestion = 3;
var fails = 2;

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
        generateQuestion();
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
    if (questionNumber > 1) {
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
    failslist.innerHTML = 'Il vous reste ' + (fails+1) + ' essais';
    currDiv.appendChild(failslist);
}

const createQuestion = (questions) => {
    let random = parseInt(Math.random() * questions.length);

    const dept = questions[random];

    return dept
}

const checkAnswer = (userChoice) => {
    if (userChoice == question) {
        //Dans le cas d'une bonne reponse
        document.getElementById(userChoice).children[0].style.fill = "green"

    } else {
        if (!(responses.includes(userChoice))) {
            responses.push(userChoice);
            document.getElementById(userChoice).children[0].style.fill = "red"
            if (fails > 0) {
                fails--;
                updateFails()
            } else {
                //nombre de tentatives depassees : on propose de passer a la question suivante.
                document.getElementById("fail").style.display = 'none'
                document.getElementById("map__image").style.display = 'none'
                document.getElementById("next").style.display = 'none'
                myDiv = document.getElementById("map");
                nextQuestion = document.createElement('a');
                nextQuestion.innerHTML = "Question Suivante";
                nextQuestion.id = "pass"
                nextQuestion.addEventListener('click', function () {
                    questionNumber++;
                    generateQuestion();
                })
                nextQuestion.className += "button2";
                myDiv.appendChild(nextQuestion);
            }
        }
    }
}