
const BEGINNER = "BEGINNER";
const MEDIUM = "MEDIUM";
const EXPERT = "EXPERT";
const IMPOSSIBLE = "IMPOSSIBLE";
const DIFFICULTY = {
  BEGINNER: {
    mines: 2,
    dimension: 4
  },
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
var SMILE = '&#128522;';
var SUNGLASSES = '&#128526;';
var DEAD = '&#128128;';

var game = {
  isStarted: false,
  lives: 3,
  currentDifficulty: null,
  time: 0
}
var timer;
var gBoard;

function chooseDifficulty(difficulty) {
  game.currentDifficulty = difficulty;
  game.lives = 3;
  game.time = 0;
  var elTimer = document.getElementById('timer');
  elTimer.innerText = 0;
  var elSmiley = document.getElementById('smiley');
  elSmiley.innerHTML = '<span>'+SMILE+'</span>';
  var elLives = document.getElementById('lives');
  elLives.innerText = 3;
  var elDifficultyModal = document.getElementById('difficulty');
  elDifficultyModal.style.display = 'none';
  var elGameContainer = document.getElementById('game-container');
  elGameContainer.style.display = 'initial';
  var elMineInfo = document.getElementById('mines');
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
  timer = setInterval(function() {
    game.time = game.time + 10;
    var elTimer = document.getElementById('timer');
    elTimer.innerText = Math.floor(game.time / 1000)
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

function checkIfPlayerWon() {
  var dimension = DIFFICULTY[game.currentDifficulty].dimension;
  for(var i = 0; i < dimension; i++) {
    for(var j = 0; j < dimension; j++) {
      var squareInfo = gBoard[i][j];
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
  var elSmiley = document.getElementById('smiley');
  elSmiley.innerHTML = '<span>'+SUNGLASSES+'</span>';
}

function gameLost() {
  game.isStarted = false;
  stopTimer();
  var elSmiley = document.getElementById('smiley');
  elSmiley.innerHTML = '<span>'+DEAD+'</span>';
}

function lifeLost() {
  game.lives--;
  var elLives = document.getElementById('lives');
  elLives.innerText = game.lives;
}

function playAgain() {
  game.isStarted = false;
  chooseDifficulty(game.currentDifficulty);
}