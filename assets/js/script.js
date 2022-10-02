const gameArea = document.getElementById('game-area');
const mainPage = document.getElementById('main-page');
const generalKnowledge = document.getElementById('general-knowledge');
const sports = document.getElementById('sports');
const history = document.getElementById('history');
const questionArea = document.getElementById('question-area');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
let scoreText = document.getElementById('score-text');
const endScreen = document.getElementById('end-screen');
const choice1 = document.getElementById('choice1')
const choice2 = document.getElementById('choice2')
const choice3 = document.getElementById('choice3')
const choice4 = document.getElementById('choice4')

let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = []

generalKnowledge.addEventListener('click', startGeneralKnowledge);

async function getQuestionFromAPI() {
    url = 'https://the-trivia-api.com/api/questions';
    let response = await fetch(url);
    if (response.ok) {
      availableQuestions = await response.json();
    } else {
      alert("HTTP-Error: " + response.status);
    }
}

function renderNewQuestion() {
    availableQuestions.forEach (ques => {
        console.log(ques['question'], ques['incorrectAnswers'], ques['correctAnswer']);
    })
}

async function startGeneralKnowledge () {
    mainPage.classList.add('hide')
    questionArea.classList.remove('hide')
    scoreText.innerText = score
    questionCounter = 0;
    await getQuestionFromAPI();
    renderNewQuestion();
    showQuestion()
}

score = 0;

function showQuestion () {
    questionText.innerText = availableQuestions[questionCounter].question;
    const answers = availableQuestions[questionCounter].incorrectAnswers.concat(availableQuestions[questionCounter].correctAnswer);

    function shuffledAnswers () {
        answers.sort(() => Math.random() - 0.5);
    };

    shuffledAnswers ();

    function displayAnswers () {
        choice1.innerText = answers[0]
        choice2.innerText = answers[1]
        choice3.innerText = answers[2]
        choice4.innerText = answers[3]
        }

    displayAnswers ()

    choice1.onclick = (e) => {
        e.preventDefault();
        if (answers[0] === availableQuestions[0].correctAnswer) {
        increamentScore ()
    }
        getNewQuestion ()
    }
    
    choice2.onclick = (e) => {
        e.preventDefault();
        if (answers[1] === availableQuestions[0].correctAnswer) {
        increamentScore () 
        }
        getNewQuestion ()
    }
    
    choice3.onclick = (e) => {
        e.preventDefault();
        if (answers[2] === availableQuestions[0].correctAnswer) {
        increamentScore () 
    }
        getNewQuestion ()
    }
    
    choice4.onclick = (e) => {
        e.preventDefault();
        if (answers[3] === availableQuestions[0].correctAnswer) {
        increamentScore ()
    }
        getNewQuestion ()
    }

    function getNewQuestion () {
        questionCounter++;
        showQuestion ()
    }

    function increamentScore () {
        scoreText++  
    }
    
}










