const startButton = document.getElementById('start-btn')
const instructGone= document.getElementById('instructions')
const showQuestionsEl = document.getElementById('question-container')
startButton.addEventListener('click', startQuiz)
instructGone.addEventListener('click', startQuiz)
const questionEl = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const countdownEl = document.getElementById('countdown')
let timeLeft = 150;
let timerId;

//starts quiz
let startQuestions=""
var index = 0
function startQuiz(){
    console.log('Started')
    startButton.classList.add('hide')
    instructGone.classList.add('hide')
    showQuestionsEl.classList.remove('hide')
    timerId = setInterval(timerFunc , 1000)
    countdownEl.textContent = `${timeLeft} seconds`
   setNextQuestion()
}
function timerFunc(){
    timeLeft--;
        countdownEl.textContent = `${timeLeft} seconds`
        if (timeLeft <= 0){
            gameOver()
        }
}
function setNextQuestion(){
    var currentQuestion = questions[index]
    questionEl.textContent= currentQuestion.question
    var answer1 = document.getElementById("answer-1")
    answer1.textContent = questions[index].answers[0]
    answer1.addEventListener('click', selectAnswer)
}

//Selects the answer
function selectAnswer(event){
console.log(event.target)

//what caused the event listener to run(event.target)  (text-content-calls it to run)
var usersChoice = event.target.textContent
var correctChoice = questions[index].correct
var resultEl = document.getElementById("result-container")
    if (correctChoice === usersChoice){
            resultEl.textContent = 'CORRECT';
        }else{
            resultEl.textContent = 'Incorrect';
        }
            resultEl.removeAttribute ("class");
        setTimeout(function() {
            resultEl.setAttribute ("class" , "hide");
        }, 1000)
    index++

    if( index === questions.length || timeLeft < 0){
        gameOver()
    }

    setNextQuestion()
}
    function gameOver(){
        clearInterval(timerId)

        let endContainerEl = document.getElementById('end-container')
            endContainerEl.removeAttribute('class')
        let finalEl = document.getElementById('your-score');
            finalEl.textContent = timeLeft;
            showQuestionsEl.setAttribute('class' , 'hide')
    }
const questions =[
{
    question: "what is 2 + 2?",
    answers: ['4','44', '33', '2'], 
    correct: "4"
},
{
    question: "What is 3 + 3?",
    answers:['6', '8', '3', '17'],
    correct: "6"
}
]

//timer
//game over section
