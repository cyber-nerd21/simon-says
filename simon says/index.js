const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Center button
const centerBtn = document.getElementById("center-btn");
// Score message & high score display
const scoreMsgEl = document.getElementById("score-msg");
const highScoreEl = document.getElementById("high-score");

// On load, display high score from localStorage
highScoreEl.textContent = `High Score: ${localStorage.getItem("highScore") || 0}`;

centerBtn.addEventListener("click", () => {
  if (!started) {
    centerBtn.textContent = "";
    scoreMsgEl.textContent = ""; // clear any previous message
    nextSequence();
    started = true;
  }
});

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function () {
    if (!started) return;

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
  centerBtn.textContent = level;

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
    document.body.classList.add("flash");
    setTimeout(() => document.body.classList.remove("flash"), 200);

    // Show reached level
    scoreMsgEl.textContent = `You reached Level ${level}`;

    // High score logic
    const prevHigh = localStorage.getItem("highScore") || 0;
    if (level > prevHigh) {
      localStorage.setItem("highScore", level);
      highScoreEl.textContent = `🏆 New High Score: ${level}`;
      highScoreEl.style.color = "#00ffcc";
    }

    centerBtn.textContent = "RESTART";
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}

