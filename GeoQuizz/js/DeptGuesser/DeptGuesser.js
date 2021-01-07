var map = document.querySelector('#map')
var paths = document.querySelectorAll('.map__image a')
var depts = []
var question = ''

let state = {
    question: null,
    answer: null,
    end: null
}

paths.forEach(function (path) {
    path.addEventListener('click',function (e) {
        console.log(e.path[1].id)
    })
})


const init = async () => {
    state.question = document.querySelector("#question");
    state.answer = document.querySelector("#answer");
    state.end = document.querySelector("#end");
    state.selectMode = document.querySelector("#select");

    next.addEventListener('click', function () {
        switchState('answer');
        questionNumber++;
        state.answer.querySelector('#bonrep').innerHTML = `La réponse était : <p style="color:green; margin-top:1%">  ${question} </p>`;
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

const createQuestion = (questions) => {
    let random = parseInt(Math.random() * questions.length);

    const dept = questions[random];

    return dept
}

const checkAnswer = (userChoice) => {
    if (userChoice == question) {
        
    }
}