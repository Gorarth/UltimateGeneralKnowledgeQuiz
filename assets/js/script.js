/* using const to define a veriable to getElementById from the document using the id names - these values cannot be changed */

const gameArea = document.getElementById('game-area');
const mainPage = document.getElementById('main-page');
const generalKnowledge = document.getElementById('general-knowledge');
const sports = document.getElementById('sports');
const historyButton = document.getElementById('history');
const questionArea = document.getElementById('question-area');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const endScreen = document.getElementById('end-screen');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const choice4 = document.getElementById('choice4');
const foodAndDrink = document.getElementById('food-and-drink');
const questionCategoryEndScreen = document.getElementById('question-category-end-screen');
const restart = document.getElementById('restart');
const backgroundContainer = document.getElementById('background-container');

/* using let to define a veriable to getElementById from the document using id names or setting a new veriable to be used within the script - these values can be changed within the script*/

let scoreText = document.getElementById('score-text');
let scoreTextEndScreen = document.getElementById('score-text-end-screen');
let questionCounter = 0;
let availableQuestions = [];

/* Add event listeners to the targetted buttons to start a function when clicked. */

generalKnowledge.addEventListener('click', startGeneralKnowledge);
historyButton.addEventListener('click', startHistory);
sports.addEventListener('click', startSports);
foodAndDrink.addEventListener('click', startFoodAndDrink);
restart.addEventListener('click', restartGame);

/* async functions to get questions from an api, once it has fetched the data, it puts the data into a json availableQuestions, to be read later on to set the questions and cycle through them. 4 different async functions for each category.*/

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

/* ?? */

function renderNewQuestion() {
    availableQuestions.forEach (ques => {
        console.log(ques['question'], ques['incorrectAnswers'], ques['correctAnswer']);
    });
}

/* async function which reacts with the eventListener depending on which button was pressed. 4 different async functions for each category*/

async function startGeneralKnowledge () {

/* changes the background image */
    backgroundContainer.classList.remove('body-background');
    backgroundContainer.classList.add('body-background-general-knowledge');

/* changes the text in the game area and the end screen depending on the category selected. */
    questionCategory.innerText = "General Knowledge";
    questionCategoryEndScreen.innerText = "General Knowledge";

/* hides the main page and displays the question area. */
    mainPage.classList.add('hide');
    questionArea.classList.remove('hide');

/* sets the score text to the variable score, defined below these async functions. 
    Sets the question counter to 0, to loop through the questions fetched from the API. */
    scoreText.innerText = score;
    questionCounter = 0;

/* Takes the questions from the API, loops through them and showQuestion to display the question and answers. */
    await getQuestionFromAPI();
    renderNewQuestion();
    showQuestion();

}

/* function the same as startGeneralKnowledge above, but changes and targets slightly different due to the chosen category being History. */

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

/* function the same as startGeneralKnowledge above, but changes and targets slightly different due to the chosen category being Sports. */

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

/* function the same as startGeneralKnowledge above, but changes and targets slightly different due to the chosen category being Food & Drink. */

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

/* Sets score to 0. */

let score = 0;

/* Main game function. */

function showQuestion () {

/* Displays the question text, depending on the [questionCounter, Starts at 0] */    

    questionText.innerText = availableQuestions[questionCounter].question;

/* const answers takes the incorrect answers and the correct answer from the array of question, depending on the questionCounter and creates and new array with all 4 possible answers in. */
    const answers = availableQuestions[questionCounter].incorrectAnswers.concat(availableQuestions[questionCounter].correctAnswer);

/* due to creating a new array, the correct answer will always be the fourth choice. function shuffledAnswers takes the new array and shuffles the answers to always be random. */

    function shuffledAnswers () {
        answers.sort(() => Math.random() - 0.5);
    }

    shuffledAnswers ();

/* takes our shuffled answers and displays them to each button. */

    function displayAnswers () {
        choice1.innerText = answers[0];
        choice2.innerText = answers[1];
        choice3.innerText = answers[2];
        choice4.innerText = answers[3];
        }

    displayAnswers ();

/* onclick choice1 to choice4 > to react to when clicked. using an if statment to increamentScore, if the answer selected was correct. 
        a second if statment used to check if there is any more questions left to display, if statment is true, performs function getNewQuestion below,
        else statment used if no more questions are left, which in turn displays the end screen to the user.
*/

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
    };
    
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
    };
    
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
    };
    
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
    };

/* function used to add 1 to the question counter and then cycle through the showQuestion function again.*/

    function getNewQuestion () {
        questionCounter++;
        showQuestion ();
    }

/* function used to add 1 to the variable score and then displays the up-to-date score */

    function increamentScore () {
        score++  ;
        scoreText.innerText = score;
    }
    
/* function used if there is no more questions to be displayed. this function shows the end screen */

    function showEndScreen () {

/* adds the class 'hide' to the question area, and then removes 'hide' from the end screen */
        questionArea.classList.add('hide');
        endScreen.classList.remove('hide');

/* displays the score which the user got while playing the game */
        scoreTextEndScreen.innerText = score;

/* increases the maxHeight of the game area so all the information can fix in. */
        document.getElementById("game-area").style.maxHeight = "80%";
    }
    
}

/* function for when the eventListener on the button "restart" is pressed. */

function restartGame () {

/* removes the class 'hide' from the mainPage to display the start screen, and then adds 'hide' to the end screen. */
    mainPage.classList.remove('hide');
    endScreen.classList.add('hide');

/* resets the score to 0, if they want to play again. */
    score = 0;

/* removes any background which was applied, depending on the category pressed, and displays the orginal background for the start page. */
    backgroundContainer.classList.remove('body-background-general-knowledge');
    backgroundContainer.classList.remove('body-background-history');
    backgroundContainer.classList.remove('body-background-sports');
    backgroundContainer.classList.remove('body-background-food-and-drink');
    backgroundContainer.classList.add('body-background');
    gameArea.classList.remove('hide');

/* decreases the max height of the game area back to the orginal 60%, which was changed when the user reached the endScreen. */
    document.getElementById("game-area").style.maxHeight = "60%";
}







