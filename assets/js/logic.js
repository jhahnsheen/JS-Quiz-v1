// declare variables
let time = 75;
let timer = document.getElementById('time');
// need to declare a timer globally to ensure that multiple functions can use this
let quizTimer;
// honest point: I didn't think of doing this before seeing the homework aha
let questionIndex = 0;

// questions array
const quiz = [
    {
        question: "Which of these variable types is not able to be changed once it has been declared?",
        choices: ["var", "const", "let", "is"],
        answer: "const"
    }, 
    {
        question: "All of these data types are considered a primitive value except:",
        choices: ["array", "boolean", "string", "null"],
        answer: "array"
    }, 
    {
        question: "If a variable is declared, let quiz = 1, and it is later reassigned, var quiz = 3, the result would be:",
        choices: ["var quiz = 3", "let quiz = 3", "let quiz = 1", "Syntax error"],
        answer: "Syntax error"
    }, 
    {
        question: "Strict equality is designated by:",
        choices: ["=", "==", "===", "All of the above"],
        answer: "==="
    }, 
    {
        question: "What do we call a set of statements that performs a task or calculates a value?",
        choices: ["rules", "conditions", "calculations", "function"],
        answer: "function"
    }
];

// start quiz
function quizStart() {
    // hide starting screen by setting class to hidden
    let startingScreen = document.getElementById('startScreen');
    startingScreen.setAttribute('class', 'hidden');

    // display quiz screen
    let questions = document.getElementById('quizScreen');
    questions.removeAttribute('class');

    // start timer
    quizTimer = setInterval(timerCounter, 1000);
    
    //show timer
    timer.textContent = time;

    // start questions
    quizQuestions();
}

// load question function
function quizQuestions() {
    // get next question in array
    let questionNow = quiz[questionIndex];

    // show question
    let showQuestion = document.getElementById('quizQuestion');
    showQuestion.textContent = questionNow.question;

    // clear out previous choices on previous question iterations
    let answers = document.getElementById('answerChoice');
    answers.innerHTML = '';

    // show answer choices by looping through and appending each  answer choice individually
    questionNow.choices.forEach((select, index) => {
        // create button with submit value properties
        let buttonMaker = document.createElement('button');
        buttonMaker.setAttribute('class', 'block px-4 py-2 mt-8 text-2xl font-medium text-[#FFFFFF] bg-red-600 rounded-lg hover:text-gray-200 focus:text-gray-200 hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:shadow-outline');
        buttonMaker.setAttribute('value', select);
        buttonMaker.textContent = `${index + 1}. ${select}`;

        // event listener to check answer
        buttonMaker.onclick = checkAnswer;

        // append button onto the div
        answers.appendChild(buttonMaker);
    });
}

// check user input
function checkAnswer() {
    // wrong answer
    if(this.value !== quiz[questionIndex].answer) {
        // subtract time/points
        time -= 15;
        // show changes in time
        timer.textContent = time;
    }

    // move to next question in array
    questionIndex++;
    
    // checks to see if any more questions
    if(questionIndex === quiz.length) {
        // end test if no more
        endQuiz();
    } else {
        // load next question otherwise
        quizQuestions();
    }
}

// end quiz
function endQuiz() {
    // stop timer
    clearInterval(quizTimer);

    // show results page
    let resultsPage = document.getElementById('resultScreen');
    resultsPage.removeAttribute('class');

    // show score/time
    let totalScore = document.getElementById('endScore');
    totalScore.textContent = time;

    // hide questions section
    let questions = document.getElementById('quizScreen');
    questions.setAttribute('class', 'hidden');
}

// timer 
function timerCounter() {
    // depreciate time
    time--;
    // update time visual
    timer.textContent = time;
    // check if timer is out and end quiz if out
    if (time <= 0) {
        endQuiz();
    }
}

// save score
function submitScore() {
    // prevent the function from misinterpreting variables
    let initials = document.getElementById('initials');
    let winner = initials.value.trim();
    // get saved scores or an empty array if no entries in local storage
    if(winner !== '') {
        let highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
        
        // create new object to be pushed to local storage
        let addScore = {
            score: time,
            initials: winner
        };

        // push it to local storage
        highscores.push(addScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

        // send user to high score page
        window.location.href = '/highScores.html';
    }
}

// event listeners
// save score
document.getElementById('submitButton').onclick = submitScore;
// start quiz
document.getElementById('startButton').addEventListener('click', quizStart);
