const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

document.getElementById("level-title").textContent = "Tap or Press Any Key to Start";

function startGame() {
  if (!started) {
    nextSequence();
    started = true;
  }
}

document.addEventListener("keydown", startGame);
document.addEventListener("click", startGame);

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function () {
    const userChosenColor = this.id.trim();
    userClickedPattern.push(userChosenColor);

    flashButton(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  const randomColor = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  flashButton(randomColor);
  playSound(randomColor);
}

function flashButton(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 200);
}

function playSound(name) {
  const audio =
    name === "wrong"
      ? new Audio("assets/wrong-47985.mp3")
      : new Audio("assets/ding-126626.mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.getElementById("level-title").textContent =
      "Game Over, Tap or Press Any Key to Restart";

    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

