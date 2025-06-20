const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// DOM Elements
const centerBtn = document.getElementById("center-btn");
const scoreMsgEl = document.getElementById("score-msg");
const highScoreEl = document.getElementById("high-score");

// Load high score from localStorage
const savedHigh = parseInt(localStorage.getItem("highScore")) || 0;
highScoreEl.textContent = `High Score: ${savedHigh}`;

// Start Game
centerBtn.addEventListener("click", () => {
  if (!started) {
    centerBtn.textContent = "";
    scoreMsgEl.textContent = "";
    started = true;
    nextSequence();
  }
});

// Handle button click
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function () {
    if (!started) return;

    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    flashButton(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

// Generate next color in sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  centerBtn.textContent = level;

  const randomColor = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  setTimeout(() => {
    flashButton(randomColor);
    playSound(randomColor);
  }, 300);
}

// Animate button press
function flashButton(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 200);
}

// Play sound
function playSound(name) {
  const audio =
    name === "wrong"
      ? new Audio("assets/wrong-47985.mp3")
      : new Audio("assets/ding-126626.mp3");
  audio.play();
}

// Check user's input
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    // Game Over
    playSound("wrong");
    document.body.classList.add("flash");
    setTimeout(() => document.body.classList.remove("flash"), 200);

    scoreMsgEl.textContent = `You reached Level ${level}`;

    // High score check
    const currentHigh = parseInt(localStorage.getItem("highScore")) || 0;
    if (level > currentHigh) {
      localStorage.setItem("highScore", level);
      highScoreEl.textContent = `🏆 New High Score: ${level}`;
      highScoreEl.style.color = "#00ffcc";
    }

    centerBtn.textContent = "RESTART";
    startOver();
  }
}

// Reset everything
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
