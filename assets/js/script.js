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

var timeLeft = 60;
//starts quiz
let startQuestions = ""
var index = 0
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

function storePlayerScore() {
    let initials = initialsEl.value.trim();
    if (initials !== "") {
        let highScores = JSON.parse(localStorage.getItem("high-scores")) || [];
        let playerScore = {
            score: timeLeft,
            initials: initials,
        };
        highScores.push(playerScore);
        localStorage.setItem("high-scores", JSON.stringify(highScores))
        //window.location.href = "highScores.html"
    }
}

const questions = [
    {
        question: "what is 2 + 2?",
        answers: ['4', '44', '33', '2'],
        correct: "4"
    },
    {
        question: "What is 3 + 3?",
        answers: ['6', '8', '3', '17'],
        correct: "6"
    }
]

//timer
//game over section
