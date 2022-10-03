const gameArea = document.getElementById('game-area');
const mainPage = document.getElementById('main-page');
const generalKnowledge = document.getElementById('general-knowledge');
const sports = document.getElementById('sports');
const history = document.getElementById('history');
const questionArea = document.getElementById('question-area');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const endScreen = document.getElementById('end-screen');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const choice4 = document.getElementById('choice4');
const foodAndDrink = document.getElementById('food-and-drink');
const questionCategoryEndScreen = document.getElementById('question-category-end-screen');
const restart = document.getElementById('restart');
const backgroundContainer = document.getElementById('background-container');

let scoreText = document.getElementById('score-text');
let scoreTextEndScreen = document.getElementById('score-text-end-screen');
let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];

generalKnowledge.addEventListener('click', startGeneralKnowledge);
history.addEventListener('click', startHistory);
sports.addEventListener('click', startSports);
foodAndDrink.addEventListener('click', startFoodAndDrink);
restart.addEventListener('click', restartGame);

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

async function getQuestionFromAPIFoodAndDrink() {
    url = 'https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=10&difficulty=medium';
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
    backgroundContainer.classList.remove('body-background');
    backgroundContainer.classList.add('body-background-general-knowledge');

    questionCategory.innerText = "General Knowledge";
    questionCategoryEndScreen.innerText = "General Knowledge";
    mainPage.classList.add('hide');
    questionArea.classList.remove('hide');
    scoreText.innerText = score;
    questionCounter = 0;
    await getQuestionFromAPI();
    renderNewQuestion();
    showQuestion();

}

async function startHistory () {
    backgroundContainer.classList.remove('body-background');
    backgroundContainer.classList.add('body-background-history');

    questionCategory.innerText = "History";
    questionCategoryEndScreen.innerText = "History";
    mainPage.classList.add('hide');
    questionArea.classList.remove('hide');
    scoreText.innerText = score;
    questionCounter = 0;
    await getQuestionFromAPIHistory();
    renderNewQuestion();
    showQuestion();
}

async function startSports () {
    backgroundContainer.classList.remove('body-background');
    backgroundContainer.classList.add('body-background-sports');

    questionCategory.innerText = "Sports";
    questionCategoryEndScreen.innerText = "Sports";
    mainPage.classList.add('hide');
    questionArea.classList.remove('hide');
    scoreText.innerText = score;
    questionCounter = 0;
    await getQuestionFromAPISports();
    renderNewQuestion();
    showQuestion();
}

async function startFoodAndDrink () {
    backgroundContainer.classList.remove('body-background');
    backgroundContainer.classList.add('body-background-food-and-drink');

    questionCategory.innerText = "Food & Drink";
    questionCategoryEndScreen.innerText = "Food & Drink";
    mainPage.classList.add('hide');
    questionArea.classList.remove('hide');
    scoreText.innerText = score;
    questionCounter = 0;
    await getQuestionFromAPIFoodAndDrink();
    renderNewQuestion();
    showQuestion();
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
        choice1.innerText = answers[0];
        choice2.innerText = answers[1];
        choice3.innerText = answers[2];
        choice4.innerText = answers[3];
        }

    displayAnswers ()

    choice1.onclick = (e) => {
        e.preventDefault();
        if (answers[0] === availableQuestions[questionCounter].correctAnswer) {
        increamentScore ();
    } 
        if (availableQuestions.length > questionCounter + 1 ) {
        getNewQuestion () ;
            } else {
            showEndScreen ();
            }
    }
    
    choice2.onclick = (e) => {
        e.preventDefault();
        if (answers[1] === availableQuestions[questionCounter].correctAnswer) {
        increamentScore () ;
        }
        if (availableQuestions.length > questionCounter + 1 ) {
            getNewQuestion () ;
            } else {
                showEndScreen ();
            }
    }
    
    choice3.onclick = (e) => {
        e.preventDefault();
        if (answers[2] === availableQuestions[questionCounter].correctAnswer) {
        increamentScore () ;
    }
        if (availableQuestions.length > questionCounter + 1 ) {
        getNewQuestion () ;
            } else {
            showEndScreen ();
            }
    }
    
    choice4.onclick = (e) => {
        e.preventDefault();
        if (answers[3] === availableQuestions[questionCounter].correctAnswer) {
        increamentScore ();
    }
        if (availableQuestions.length > questionCounter + 1 ) {
        getNewQuestion () ;
            } else {
            showEndScreen ();
            }
    }

    function getNewQuestion () {
        questionCounter++;
        showQuestion ();
    }

    function increamentScore () {
        score++  ;
        scoreText.innerText = score;
    }
    
    function showEndScreen () {
        questionArea.classList.add('hide');
        endScreen.classList.remove('hide');
        scoreTextEndScreen.innerText = score;
        document.getElementById("game-area").style.maxHeight = "80%";
    }
    
}

function restartGame () {
    mainPage.classList.remove('hide');
    endScreen.classList.add('hide');
    score = 0;
    backgroundContainer.classList.remove('body-background-general-knowledge');
    backgroundContainer.classList.remove('body-background-history');
    backgroundContainer.classList.remove('body-background-sports');
    backgroundContainer.classList.remove('body-background-food-and-drink');
    backgroundContainer.classList.add('body-background');
    gameArea.classList.remove('hide');
    document.getElementById("game-area").style.maxHeight = "60%";
}







