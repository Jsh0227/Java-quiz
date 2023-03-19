const startButton = document.getElementById('start-btn')
const instructGone = document.getElementById('instructions')
const showQuestionsEl = document.getElementById('question-container')
startButton.addEventListener('click', startQuiz)
instructGone.addEventListener('click', startQuiz)
const questionEl = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const countdownEl = document.getElementById('countdown')
const submitEl = document.getElementById('submit')
const initialsEl = document.getElementById('intials')
const highScoreEl= document.getElementById('high-score-container')
const goBackButton = document.getElementById('go-back')
const clearHighScoreButton = document.getElementById('clear-high-score')
clearHighScoreButton.addEventListener('click', restartQuiz)
goBackButton.addEventListener('click', restartQuiz)
submitEl.addEventListener('click', showHighScore)

var timeLeft = 60;
//starts quiz
let startQuestions = ""
var index = 0;
let highScores = JSON.parse(localStorage.getItem("high-scores"));
let scoresDatacontainer = document.getElementById('scoresDatacontainer')


function startQuiz() {
    startButton.classList.add('hide')
    instructGone.classList.add('hide')
    showQuestionsEl.classList.remove('hide')
    timerId = setInterval(timerFunc, 1000)
    setNextQuestion()
}
function timerFunc() {
    countdownEl.textContent = `${timeLeft--} seconds`
    
}

function setNextQuestion() {
    var currentQuestion = questions[index]
    questionEl.textContent = currentQuestion.question
    var answer1 = document.getElementById("answer-1")
    var answer2 = document.getElementById("answer-2")
    var answer3 = document.getElementById("answer-3")
    var answer4 = document.getElementById("answer-4")
    answer1.textContent = questions[index].answers[0]
    answer2.textContent = questions[index].answers[1]
    answer3.textContent = questions[index].answers[2]
    answer4.textContent = questions[index].answers[3]
    answer1.addEventListener('click', selectAnswer)
    answer2.addEventListener('click', selectAnswer)
    answer3.addEventListener('click', selectAnswer)
    answer4.addEventListener('click', selectAnswer)
}

//Selects the answer
function selectAnswer(event) {
    console.log(event.target)

    //what caused the event listener to run(event.target)  (text-content-calls it to run)
    var usersChoice = event.target.textContent
    var correctChoice = questions[index].correct
    var resultEl = document.getElementById("result-container")
    if (correctChoice === usersChoice) {
        resultEl.textContent = 'CORRECT';
    } else {
        resultEl.textContent = 'Incorrect';
    }
    resultEl.removeAttribute("class");

    //Delays the function.  Goes to the next question or produces GameOver
    setTimeout(function () {
        resultEl.setAttribute("class", "hide");
        if (index === questions.length || timeLeft < 0) {
            gameOver()
        }
            else {
                setNextQuestion()
            }
        
    }, 500)
    index++

}
function gameOver() {
    timeLeft = timeLeft + 1;
    clearInterval(timerId)

    let endContainerEl = document.getElementById('end-container')
    endContainerEl.removeAttribute('class')
    let finalEl = document.getElementById('your-score');
    finalEl.textContent = timeLeft;
    showQuestionsEl.setAttribute('class', 'hide')
}

submitEl.onclick = storePlayerScore;

//Keeps the score for the user after game is over.
function storePlayerScore() {
    let initials = initialsEl.value.trim();
//intials are required
    if (initials !== "") {
        //retrieving array from local storage--converts string to array
        let playerScore = {
            score: timeLeft,
            initials: initials,
        };
        //Saving information inside of the array.  
        // highScores.push(playerScore);
        //Saving the array in local storage as a string data type
        highScores = localStorage.setItem("high-scores", JSON.stringify(playerScore))
    }
}
//Shows high score
function showHighScore(){
    let endContainerEl = document.getElementById('end-container')
    endContainerEl.setAttribute('class','hide')
    highScoreEl.removeAttribute('class')
    console.log('final score line 118', highScores);
    let finalPlayerScore = document.getElementById('finalPlayerScore');
        finalPlayerScore.textContent = highScores.initials + " " + highScores.score;
        console.log('finalPlayerScore: ', finalPlayerScore);
        
    }

   
function restartQuiz(){
    instructGone.classList.remove('hide')
    let endContainerEl = document.getElementById('end-container')
    endContainerEl.setAttribute('class','hide')
    highScoreEl.setAttribute('class', 'hide')
    startButton.classList.remove('hide')
    
}

const questions = [
    {
        question: "Common used data types do not include?",
        answers: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
        correct: "3. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with ________.",
        answers: ['1. quotes', '2. curly brackets', '3. parenthesis', '4. square brackets'],
        correct: "3. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        answers: ['1. numbers and strings', '2. other arrays', '3. booleans', '4. all of the above'],
        correct: "4. all of the above"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
        correct: "4. console.log"
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answers: ['1. commas', '2. curly brackets', '3. quotes', '4. parathensis'],
        correct: "3. quotes"
    }

]

