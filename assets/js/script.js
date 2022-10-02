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
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const choice4 = document.getElementById('choice4');

let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];

generalKnowledge.addEventListener('click', startGeneralKnowledge);
history.addEventListener('click', startHistory);
sports.addEventListener('click', startSports);

async function getQuestionFromAPI() {
    url = 'https://the-trivia-api.com/api/questions';
    let response = await fetch(url);
    if (response.ok) {
      availableQuestions = await response.json();
    } else {
      alert("HTTP-Error: " + response.status);
    }
}

async function getQuestionFromAPIHistory() {
    url = 'https://the-trivia-api.com/api/questions?categories=history&limit=10&difficulty=easy';
    let response = await fetch(url);
    if (response.ok) {
      availableQuestions = await response.json();
    } else {
      alert("HTTP-Error: " + response.status);
    }
}

async function getQuestionFromAPISports() {
    url = 'https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=10&difficulty=medium';
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

async function startHistory () {
    mainPage.classList.add('hide')
    questionArea.classList.remove('hide')
    scoreText.innerText = score
    questionCounter = 0;
    await getQuestionFromAPIHistory();
    renderNewQuestion();
    showQuestion()
}

async function startSports () {
    mainPage.classList.add('hide')
    questionArea.classList.remove('hide')
    scoreText.innerText = score
    questionCounter = 0;
    await getQuestionFromAPISports();
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
        if (answers[0] === availableQuestions[questionCounter].correctAnswer) {
        increamentScore ()
    } 
        if (availableQuestions.length > questionCounter + 1 ) {
        getNewQuestion () 
        } else {
            endScreen ()
        }
    }
    
    choice2.onclick = (e) => {
        e.preventDefault();
        if (answers[1] === availableQuestions[questionCounter].correctAnswer) {
        increamentScore () 
        }
        if (availableQuestions.length > questionCounter + 1 ) {
            getNewQuestion () 
            } else {
                endScreen ()
            }
    }
    
    choice3.onclick = (e) => {
        e.preventDefault();
        if (answers[2] === availableQuestions[questionCounter].correctAnswer) {
        increamentScore () 
    }
        if (availableQuestions.length > questionCounter + 1 ) {
        getNewQuestion () 
        } else {
            endScreen ()
        }
    }
    
    choice4.onclick = (e) => {
        e.preventDefault();
        if (answers[3] === availableQuestions[questionCounter].correctAnswer) {
        increamentScore ()
    }
        if (availableQuestions.length > questionCounter + 1 ) {
        getNewQuestion () 
        } else {
            endScreen ()
        }
    }

    function getNewQuestion () {
        questionCounter++;
        showQuestion ()
    }

    function increamentScore () {
        score++  
        scoreText.innerText = score
    }
    
    function endScreen () {
        questionArea.classList.add('hide')
    }
    
}









