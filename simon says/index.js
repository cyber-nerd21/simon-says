const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
const centerBtn = document.getElementById("center-btn");
const scoreMsgEl = document.getElementById("score-msg");
const highScoreEl = document.getElementById("high-score");
const ding = new Audio("assets/ding-126626.mp3");
const wrong = new Audio("assets/wrong-47985.mp3");
const savedHigh = parseInt(localStorage.getItem("highScore")) || 0;
highScoreEl.textContent = `High Score: ${savedHigh}`;
centerBtn.addEventListener("click", () => {
  if (!started) {
    centerBtn.textContent = "";
    scoreMsgEl.textContent = "";
    started = true;
    nextSequence();
  }
});

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function () {
    if (!started) return;

    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    userFeedback(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  centerBtn.textContent = level;

  document.querySelectorAll(".btn").forEach(btn => btn.style.pointerEvents = "none");

  const randomColor = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  setTimeout(() => {
    systemFeedback(randomColor);

    setTimeout(() => {
      document.querySelectorAll(".btn").forEach(btn => btn.style.pointerEvents = "auto");
    }, 300);
  }, 400);
}
function systemFeedback(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  playSound("ding");
  setTimeout(() => btn.classList.remove("pressed"), 200);
}
function userFeedback(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  playSound("ding");
  setTimeout(() => btn.classList.remove("pressed"), 150);
}
function playSound(type) {
  if (type === "wrong") {
    wrong.currentTime = 0;
    wrong.play();
  } else {
    ding.currentTime = 0;
    ding.play();
  }
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
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

