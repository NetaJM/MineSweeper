function getEmptyPlaceForMine(clickedCoord, minesCoords) {
  var dimension = DIFFICULTY[game.currentDifficulty].dimension
  var foundPlace = false;
  var randomPlace;
  while (!foundPlace) {
    var i = getRandomIntInclusive(0, dimension-1);
    var j = getRandomIntInclusive(0, dimension-1);
    randomPlace = '' + i + j;
    // Check if coordinate has a mine
    var isEmptyPlace = minesCoords[randomPlace] === undefined;
    // Check if not same coordinate that player clicked at first
    var notPlayerClick = i !== clickedCoord.i && j !== clickedCoord.j
    if (isEmptyPlace && notPlayerClick) {
      foundPlace = true;
    }
  }
  return randomPlace;
}

function revealNeighboringSquares(coord) {
  var sorroundingSquares = getSorroundingSquares(coord)
  for(var i = 0; i < sorroundingSquares.length; i++) {
    var squareCoord = sorroundingSquares[i];
    if (gBoard[squareCoord.i] && gBoard[squareCoord.i][squareCoord.j]) {
      var squareInfo = gBoard[squareCoord.i][squareCoord.j];
      if (!squareInfo.isShown && !squareInfo.isMine) {
        // Reveal the square
        gBoard[squareCoord.i][squareCoord.j].isShown = true;
        // If square has no neighbors, recursively call the function 
        if (!squareInfo.isNeighbor) {
          revealNeighboringSquares(squareCoord);
        }
      }
    }
  }
}

function getNeighborInfo(coord) {
  var minesAround = 0;
  var sorroundingSquares = getSorroundingSquares(coord);
  for(var i = 0; i < sorroundingSquares.length; i++) {
    var squareCoord = sorroundingSquares[i];
    if (gBoard[squareCoord.i] && gBoard[squareCoord.i][squareCoord.j] && gBoard[squareCoord.i][squareCoord.j].isMine) {
      minesAround++;
    }
  }
  var isNeighbor = minesAround > 0;
  return {
    isNeighbor: isNeighbor,
    neighborValue: minesAround
  }
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}