const gameArea = document.getElementById('game-area');
const mainPage = document.getElementById('main-page');
const generalKnowledge = document.getElementById('general-knowledge');
const sports = document.getElementById('sports');
const history = document.getElementById('history');
const questionArea = document.getElementById('question-area');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const scoreText = document.getElementById('score');
const endScreen = document.getElementById('end-screen');


let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQuestions = []

generalKnowledge.addEventListener('click', startGeneralKnowledge);
sports.addEventListener('click', startSport);
history.addEventListener('click', startHistory);

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
    score = 0;
    questionCounter = 0;
    await getQuestionFromAPI();
    renderNewQuestion();
    showQuestion()
}

function showQuestion () {
    questionText.innerText = availableQuestions[0].question
    const answers = availableQuestions[0].incorrectAnswers.concat(availableQuestions[0].correctAnswer)
    function shuffle () {
        answers.sort(() => Math.random() - 0.5);
      }
      shuffle ()
}

function getNewQuestion () {
    availableQuestions++;

}

function startSport () {
    mainPage.classList.add('hide')
    questionArea.classList.remove('hide')
}

function startHistory () {
    mainPage.classList.add('hide')
    questionArea.classList.remove('hide')
}