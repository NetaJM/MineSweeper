function getEmptyPlaceForMine(clickedCoord, minesCoords) {

  let dimension = DIFFICULTY[game.currentDifficulty].dimension
  let foundPlace = false;
  let randomPlace;

  while (!foundPlace) {

    let i = getRandomIntInclusive(0, dimension - 1);
    let j = getRandomIntInclusive(0, dimension - 1);

    randomPlace = '' + i + j;

    // Check if coordinate has a mine
    let isEmptyPlace = minesCoords[randomPlace] === undefined;

    // Check if not same coordinate that player clicked at first
    let notPlayerClick = i !== clickedCoord.i && j !== clickedCoord.j

    if (isEmptyPlace && notPlayerClick) {
      foundPlace = true;
    }
  }

  return randomPlace;
}


function revealNeighboringSquares(coord) {

  let sorroundingSquares = getSorroundingSquares(coord);

  for (let i = 0; i < sorroundingSquares.length; i++) {

    let squareCoord = sorroundingSquares[i];

    if (gBoard[squareCoord.i] && gBoard[squareCoord.i][squareCoord.j]) {

      let squareInfo = gBoard[squareCoord.i][squareCoord.j];

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

  let minesAround = 0;
  let sorroundingSquares = getSorroundingSquares(coord);

  for (let i = 0; i < sorroundingSquares.length; i++) {

    let squareCoord = sorroundingSquares[i];

    if (gBoard[squareCoord.i] && gBoard[squareCoord.i][squareCoord.j] && gBoard[squareCoord.i][squareCoord.j].isMine) {

      minesAround++;
    }
  }

  let isNeighbor = minesAround > 0;

  return {
    isNeighbor: isNeighbor,
    neighborValue: minesAround
  }
}

function getRandomIntInclusive(min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;
}