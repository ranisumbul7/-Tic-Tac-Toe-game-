const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const turnText = document.querySelector("#turn");
const scoreOText = document.querySelector("#scoreO");
const scoreXText = document.querySelector("#scoreX");
const timerDisplay = document.querySelector("#timer");
const darkBtn = document.querySelector("#darkModeBtn");

let playerOName = "Sumbul";
let playerXName = "Rani";
let turnO = true;
let count = 0;
let scoreO = 0;
let scoreX = 0;
let timer;
let timeLeft = 10;

const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8],
];

const startTimer = () => {
  clearInterval(timer);
  timeLeft = 10;
  timerDisplay.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      skipTurn();
    }
  }, 1000);
};

const skipTurn = () => {
  turnO = !turnO;
  turnText.innerText = turnO
    ? `${playerOName}'s Turn (O)`
    : `${playerXName}'s Turn (X)`;
  startTimer();
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("win");
  });
};

const disableBoxes = () => {
  boxes.forEach((box) => box.disabled = true);
};

const showWinner = (winner) => {
  let winnerName = winner === "O" ? playerOName : playerXName;
  msg.innerText = `🎉 ${winnerName} Wins!`;
  msgContainer.classList.add("show");

  if (winner === "O") {
    scoreO++;
    scoreOText.innerText = scoreO;
  } else {
    scoreX++;
    scoreXText.innerText = scoreX;
  }

  clearInterval(timer);
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = "😐 Game Draw!";
  msgContainer.classList.add("show");
  clearInterval(timer);
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");
      showWinner(val1);
      return true;
    }
  }
  return false;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    turnO = !turnO;
    count++;

    turnText.innerText = turnO
      ? `${playerOName}'s Turn (O)`
      : `${playerXName}'s Turn (X)`;

    let winner = checkWinner();
    if (count === 9 && !winner) {
      gameDraw();
    }

    if (!winner) startTimer();
  });
});

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.remove("show");
  turnText.innerText = `${playerOName}'s Turn (O)`;
  startTimer();
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);


// Start
startTimer();
