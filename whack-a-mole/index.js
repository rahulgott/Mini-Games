const holes = document.querySelectorAll('.hole');
const startButton = document.querySelector('.start-button');
const whatTime = document.querySelector('.what-time');
const currentScore = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
const increment = document.querySelector('.increment');
const decrement = document.querySelector('.decrement');
const timerInput = document.querySelector('.timer-value');
const countDown = document.querySelector('.timer-countdown');
const moles = document.querySelectorAll('.mole');
let timerValue = parseInt(timerInput.value);
let timerFixedValue
let lastHole
let timeUp = false
let score = 0
let counter = 0
let isAlreadyPeeking = false

const arr = []
const localHighScores = JSON.parse(localStorage.getItem('mole-highScores'))
let relevantScore
for(let i=1 ; i<7; i++) {
    const obj = {
        timer: i*10,
        highScore: 0
    }
    arr.push(obj)
}
// console.log(arr)
// console.log("log",localHighScores)
(localHighScores === null) ? localStorage.setItem('mole-highScores', JSON.stringify(arr)) : null


countDown.innerHTML = timerValue
whatTime.innerHTML = timerInput.value
highScore.textContent = localHighScores[0].highScore


moles.forEach(mole => mole.addEventListener('click', bonk));

function incrementTimer() {
    timerFixedValue = timerValue
    timerInput.value = (timerValue < 60) ? timerValue+=10 : 60
    whatTime.innerHTML = timerInput.value
    countDown.innerHTML = timerValue
    highScore.textContent = localHighScores[timerValue/10 - 1].highScore
    console.log(localHighScores[timerValue/10 - 1])
}

function decrementTimer() {
    timerFixedValue = timerValue
    timerInput.value = (timerValue > 0) ? timerValue-=10 : 0
    whatTime.innerHTML = timerInput.value
    countDown.innerHTML = timerValue
    highScore.textContent = localHighScores[timerValue/10 - 1].highScore
    console.log(localHighScores[timerValue/10 - 1])    
}

function startGame() {
    timerFixedValue = timerValue
    relevantScore = localHighScores[timerFixedValue/10 - 1]
    counter++
    if(counter%2 === 0) {
        location.reload()
    }
    if(!isAlreadyPeeking) {
        currentScore.textContent = 0
        score = 0
        timeUp = false
        peek()
        startButton.innerHTML = "Reset"
        let myTimer = setInterval(() => {
            if(timeUp) {
                clearInterval(myTimer)
            }
            countDown.innerHTML = --timerValue
        }, 1000);
        setTimeout(() => timeUp = true, (timerValue - 1) * 1000);
    }    
}

function randTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randHole(holes) {
    const id = Math.floor(Math.random() * holes.length)
    const hole = holes[id]
    if(hole === lastHole) {
        return randHole(holes)
    }
    lastHole = hole
    return hole
}

function peek() {
    const time = randTime(200, 1000)
    const hole = randHole(holes)
    isAlreadyPeeking = true
    hole.classList.add('up')
    setTimeout(() => {
        hole.classList.remove('up') 
        isAlreadyPeeking = false
        if(!timeUp) peek()
    }, time);
}

function bonk(e) {
    console.log(relevantScore)
    if(!e.isTrusted) return
    score++
    this.parentNode.classList.remove('up');
    currentScore.textContent = score;
    if(relevantScore.highScore !== null){
        if (score > relevantScore.highScore) {
            highScore.textContent = score
            relevantScore.highScore = score
            localHighScores.splice(timerFixedValue/10-1, 1, relevantScore)
            // console.log(timerFixedValue)
            localStorage.setItem('mole-highScores', JSON.stringify(localHighScores))  
        }
    }
    else{
        relevantScore.highScore = score
        localStorage.setItem('mole-highScores', JSON.stringify(localHighScores)) 
    }
}
