const buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;

let userClickedPattern = [];

let gamePattern = [];

let started = false;

$(document).keypress(() => {
  if (!started) {
    nextSequence();
    started = true;
  }
});

const nextSequence = () => {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);

  const randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  $("h1").text(`Level ${(level += 1)}`);
};

$(".btn").click((event) => {
  const userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress($(event.target));
  checkAnswer(userClickedPattern.length - 1);
});

const playSound = (name) => {
  const sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
};

const animatePress = (currentColour) => {
  currentColour.addClass("pressed");
  setTimeout(() => {
    currentColour.removeClass("pressed");
  }, 100);
};

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
