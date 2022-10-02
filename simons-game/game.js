
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

var score = level
var highScore = localStorage.getItem('simons-highScore')

$(document).ready(function() {
    (highScore) ? $("#highScore").text(highScore) : 0
})

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        $("#score").text(score)
        nextSequence();
        started = true; 
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length ) {
            $("#score").text(++score)
            if(highScore !== null){
                console.log(score)
                if (score > highScore) {
                    localStorage.setItem("simons-highScore", score);
                    highScore = localStorage.getItem("simons-highScore");
                    $("#highScore").text(highScore)      
                }
            }
            else{
                localStorage.setItem("simons-highScore", score);
                highScore = localStorage.getItem("simons-highScore");
                $("#highScore").text(highScore)
            }
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level); 
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    score = 0;
    gamePattern = [];
    started = false;
}
