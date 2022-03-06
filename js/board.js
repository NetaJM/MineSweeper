
function buildFakeBoard() {
  gBoard = [];
  let dimension = DIFFICULTY[game.currentDifficulty].dimension;

  // Build the fake board
  for (let i = 0; i < dimension; i++) {
    gBoard.push([]);
    for (let j = 0; j < dimension; j++) {
      gBoard[i].push({
        isMine: false,
        isShown: false,
        isFlagged: false,
        isExploded: false,
        isNeighbor: false,
        neighborValue: 0
      })
    }
  }
}

// real board after player's first click
function buildBoard(clickedCoord) {
  gBoard = [];
  let mines = DIFFICULTY[game.currentDifficulty].mines;
  let dimension = DIFFICULTY[game.currentDifficulty].dimension;

  // Randomly choose mine locations
  let minesCoords = {};
  for (let i = 0; i < mines; i++) {
    let newMineCoord = getEmptyPlaceForMine(clickedCoord, minesCoords)
    minesCoords[newMineCoord] = true;
  }
  console.log(minesCoords)

  for (let i = 0; i < dimension; i++) {
    gBoard.push([]);
    for (let j = 0; j < dimension; j++) {
      let isMine = minesCoords['' + i + j];
      gBoard[i].push({
        isMine: isMine,
        isShown: false,
        isFlagged: false,
        isExploded: false,
        isNeighbor: false,
        neighborValue: 0
      })
    }
  }
  console.table(gBoard);

  // Mark neighbors
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      if (gBoard[i][j].isMine) {
        continue;
      }
      let coord = {
        i: i,
        j: j
      }
      let neighborInfo = getNeighborInfo(coord);
      gBoard[i][j].isNeighbor = neighborInfo.isNeighbor;
      gBoard[i][j].neighborValue = neighborInfo.neighborValue;
    }
  }
}

function renderBoard(showMines) {
  let elBoard = document.getElementById('gBoard');
  let dimension = DIFFICULTY[game.currentDifficulty].dimension;
  let strHTML = '';
  for (let i = 0; i < dimension; i++) {
    strHTML += '<tr>'
    for (let j = 0; j < dimension; j++) {
      let isShown = gBoard[i][j].isShown;
      let isMine = gBoard[i][j].isMine;
      let isExploded = gBoard[i][j].isExploded;
      let classes = '';
      let forceShow = showMines && isMine;
      if (isShown) {
        classes = 'shown '
      }
      if (isExploded) {
        classes += 'exploded';
      }
      let functionClickCall = "clickSquare({ i: " + i + ", j:" + j + "})";
      let functionRightClickCall = "javascript:flagSquare({ i: " + i + ", j:" + j + "});return false;";
      strHTML += '<td class="square ' + classes + '" onclick="' + functionClickCall + '" oncontextmenu="' + functionRightClickCall + '">'
      strHTML += getSquareElement({ i: i, j: j }, forceShow)
      strHTML += '</td>'
    }
    strHTML += '</tr>'
  }
  elBoard.innerHTML = strHTML;
}