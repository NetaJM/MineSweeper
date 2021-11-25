var FLAG = '&#9873;';
var MINE = '&#128163;';

function getSorroundingSquares(coord) {
  var sorroundingSquares = [
    // Top Left
    { i: coord.i - 1, j: coord.j - 1 },
    // Top
    { i: coord.i - 1, j: coord.j },
    // Top Right
    { i: coord.i - 1, j: coord.j + 1 },
    // Left
    { i: coord.i, j: coord.j - 1 },
    // Right
    { i: coord.i, j: coord.j + 1 },
    // Bottom Left
    { i: coord.i + 1, j: coord.j - 1 },
    // Bottom
    { i: coord.i + 1, j: coord.j },
    // Bottom Right
    { i: coord.i + 1, j: coord.j + 1 },
  ]
  return sorroundingSquares;
}

function getSquareElement(coord, forceShow) {
  var squareInfo = gBoard[coord.i][coord.j];
  if(squareInfo.isFlagged) {
    var color = 'red';
    if (squareInfo.isExploded) {
      color = 'white'
    }
    return '<span style="color:'+color+'">'+FLAG+'</span>';
  }
  else if ((squareInfo.isShown || forceShow) && squareInfo.isMine) {
    return '<span>'+MINE+'</span>'
  }
  else if (squareInfo.isShown && squareInfo.isNeighbor) {
    return squareInfo.neighborValue;
  }
  return ' ';
}

function clickSquare(coord) {
  var squareInfo = gBoard[coord.i][coord.j];

  if (!game.isStarted) {
    if (game.lives > 0 && !squareInfo.isFlagged) {
      initGame(coord);
    }
    return;
  }

  if (squareInfo.isShown || squareInfo.isFlagged) {
    return;
  }
  else if (squareInfo.isMine) {
    if (game.lives > 1) {
      gBoard[coord.i][coord.j].isExploded = true;
      flagSquare(coord);
      renderBoard();
      lifeLost();
    } else {
      gBoard[coord.i][coord.j].isExploded = true;
      gBoard[coord.i][coord.j].isShown = true;
      renderBoard(true);
      lifeLost();
      gameLost();
    }
  }
  else {
    gBoard[coord.i][coord.j].isShown = true;
    revealNeighboringSquares(coord);
    renderBoard();
  }
  var playerWon = checkIfPlayerWon();
  if (playerWon) {
    gameWon();
  }
}

function flagSquare(coord) {
  if (!game.isStarted) {
    return;
  }
  if (gBoard[coord.i][coord.j].isShown) {
    return;
  }
  var isFlagged = gBoard[coord.i][coord.j].isFlagged;
  gBoard[coord.i][coord.j].isFlagged = !isFlagged;
  var elMineInfo = document.getElementById('mines');
  var numberLeft = Number(elMineInfo.innerText);
  if (isFlagged) {
    numberLeft++;
  }
  else {
    numberLeft--;
  }
  elMineInfo.innerText = numberLeft;
  renderBoard();
  var playerWon = checkIfPlayerWon();
  if (playerWon) {
    gameWon(true);
  }
}