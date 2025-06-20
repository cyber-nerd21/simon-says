const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

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

// Show next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  centerBtn.textContent = level;

  // Disable inputs during system turn
  document.querySelectorAll(".btn").forEach(btn => btn.style.pointerEvents = "none");

  const randomColor = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  setTimeout(() => {
    flashButton(randomColor);
    playSound(randomColor);

    // Re-enable buttons after short delay
    setTimeout(() => {
      document.querySelectorAll(".btn").forEach(btn => btn.style.pointerEvents = "auto");
    }, 300);

  }, 400);
}

// Flash animation
function flashButton(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 200);
}

// Sound
const ding = new Audio("assets/ding-126626.mp3");
const wrong = new Audio("assets/wrong-47985.mp3");

function playSound(name) {
  if (name === "wrong") {
    wrong.currentTime = 0;
    wrong.play();
  } else {
    ding.currentTime = 0;
    ding.play();
  }
}

// Logic
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("flash");
    setTimeout(() => document.body.classList.remove("flash"), 200);

    scoreMsgEl.textContent = `You reached Level ${level}`;

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

// Reset
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
