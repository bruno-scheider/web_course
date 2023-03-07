let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let lvl = 0;
let hasStarted = false;

$("#green").on("click", function() {
  $("green").addClass("pressed");
  setTimeout(function() {
    $("green").removeClass("pressed");
  }, 100);
});

$(".btn").on("click", function(evt) {
  let userChosenColor = evt.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1)
  //console.log(userClickedPattern);
});

function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentlvl) {
  if (userClickedPattern[currentlvl] === gamePattern[currentlvl]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else if(hasStarted) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("GameOver, press any key to restart");
    startOver();
  }
}

function startOver(){
  hasStarted = false;
  lvl = 0;
  gamePattern = [];
}

function nextSequence() {
  $("#level-title").text("Level " + lvl);
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let nextButton = buttonColors[randomNumber];
  gamePattern.push(nextButton);
  $("#" + nextButton).fadeOut("fast").fadeIn("fast");
  playSound(nextButton);
  lvl++;
}

$(document).on("keydown", function() {
  if (!hasStarted) {
    hasStarted = true;
    nextSequence();
  }
});
