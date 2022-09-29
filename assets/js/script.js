const gameArea = document.getElementById('game-area')
const mainPage = document.getElementById('main-page')
const generalKnowledge = document.getElementById('general-knowledge')
const sports = document.getElementById('sports')
const history = document.getElementById('history')
const questionArea = document.getElementById('question-area')
const questionCategory = document.getElementById('question-category')
const questionText = document.getElementById('question-text')
const answerButtons = document.getElementById('answer-buttons')
const scoreText = document.getElementById('score')
const endScreen = document.getElementById('end-screen')

let currentQuestion = {}
let score = 0
let questionCounter = 0

generalKnowledge.addEventListener('click', startGeneralKnowledge);
sports.addEventListener('click', startSport);
history.addEventListener('click', startHistory);

async function getQuestionFromAPI() {
    url = 'https://the-trivia-api.com/api/categories';
    let response = await fetch(url);
    if (response.ok) {
      questions = await response.json();
    } else {
      alert("HTTP-Error: " + response.status);
    }
}

for(let i=0; i<20; i++) {
    console.log(questions[i]['question'], questions[i]['correctAnswer']);
}

function startGeneralKnowledge () {
    mainPage.classList.add('hide')
    questionArea.classList.remove('hide')
    score = 0;
    questionCounter = 0;
    getNewQuestion();
}

function getNewQuestion () {
    questionCounter++
}

function startSport () {
    mainPage.classList.add('hide')
    questionArea.classList.remove('hide')
}

function startHistory () {
    mainPage.classList.add('hide')
    questionArea.classList.remove('hide')
}