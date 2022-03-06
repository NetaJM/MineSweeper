
const MEDIUM = "MEDIUM";
const EXPERT = "EXPERT";
const IMPOSSIBLE = "IMPOSSIBLE";
const DIFFICULTY = {
  MEDIUM: {
    mines: 12,
    dimension: 6
  },
  EXPERT: {
    mines: 30,
    dimension: 12
  },
  IMPOSSIBLE: {
    mines: 60,
    dimension: 12
  }
}
let SMILE = '&#128522;';
let SUNGLASSES = '&#128526;';
let DEAD = '&#128128;';

let game = {
  isStarted: false,
  lives: 3,
  currentDifficulty: null,
  time: 0
}
let timer;
let gBoard;

function chooseDifficulty(difficulty) {
  game.currentDifficulty = difficulty;
  game.lives = 3;
  game.time = 0;
  let elTimer = document.getElementById('timer');
  elTimer.innerText = 0;
  let elSmiley = document.getElementById('smiley');
  elSmiley.innerHTML = '<span>' + SMILE + '</span>';
  let elLives = document.getElementById('lives');
  elLives.innerText = 3;
  let elDifficultyModal = document.getElementById('difficulty');
  elDifficultyModal.style.display = 'none';
  let elGameContainer = document.getElementById('game-container');
  elGameContainer.style.display = 'initial';
  let elMineInfo = document.getElementById('mines');
  elMineInfo.innerText = DIFFICULTY[difficulty].mines;
  buildFakeBoard(game.currentDifficulty);
  renderBoard();
}

function initGame(clickedCoord) {
  game.isStarted = true;
  game.lives = 3;
  buildBoard(clickedCoord);
  startTimer();
  clickSquare(clickedCoord);
}

function startTimer() {
  timer = setInterval(function () {
    game.time = game.time + 10;
    let elTimer = document.getElementById('timer');
    elTimer.innerText = Math.floor(game.time / 1000)
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

function checkIfPlayerWon() {
  let dimension = DIFFICULTY[game.currentDifficulty].dimension;
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      let squareInfo = gBoard[i][j];
      // If there is at least one unflagged mine, player did not win
      if (squareInfo.isMine && !squareInfo.isFlagged) {
        return false;
      }
      // If there is a non-mine square that is still not shown, played did not win
      if (!squareInfo.isMine && !squareInfo.isShown) {
        return false;
      }
    }
  }
  return true;
}

function gameWon() {
  game.isStarted = false;

  stopTimer();
  let elSmiley = document.getElementById('smiley');
  elSmiley.innerHTML = '<span>' + SUNGLASSES + '</span>';
}

function gameLost() {
  game.isStarted = false;
  stopTimer();
  let elSmiley = document.getElementById('smiley');
  elSmiley.innerHTML = '<span>' + DEAD + '</span>';
}

function lifeLost() {
  game.lives--;
  let elLives = document.getElementById('lives');
  elLives.innerText = game.lives;
}

function playAgain() {
  game.isStarted = false;
  chooseDifficulty(game.currentDifficulty);
}