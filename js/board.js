
function buildFakeBoard() {
  gBoard = [];
  var dimension = DIFFICULTY[game.currentDifficulty].dimension;

  // Build the fake board
  for(var i = 0; i < dimension; i++) {
    gBoard.push([]);
    for(var j = 0; j < dimension; j++) {
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
  var mines = DIFFICULTY[game.currentDifficulty].mines;
  var dimension = DIFFICULTY[game.currentDifficulty].dimension;

  // Randomly choose mine locations
  var minesCoords = {};
  for(var i = 0; i < mines; i++) {
    var newMineCoord = getEmptyPlaceForMine(clickedCoord, minesCoords)
    minesCoords[newMineCoord] = true;
  }
  console.log(minesCoords)

  for(var i = 0; i < dimension; i++) {
    gBoard.push([]);
    for(var j = 0; j < dimension; j++) {
      var isMine = minesCoords['' + i + j];
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
  for(var i = 0; i < dimension; i++) {
    for(var j = 0; j < dimension; j++) {
      if (gBoard[i][j].isMine) {
        continue;
      }
      var coord = {
        i: i, 
        j: j
      }
      var neighborInfo = getNeighborInfo(coord);
      gBoard[i][j].isNeighbor = neighborInfo.isNeighbor;
      gBoard[i][j].neighborValue = neighborInfo.neighborValue;
    }
  }
}

function renderBoard(showMines) {
  var elBoard = document.getElementById('gBoard');
  var dimension = DIFFICULTY[game.currentDifficulty].dimension;
  var strHTML = '';
  for (var i = 0; i < dimension; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < dimension; j++) {
      var isShown = gBoard[i][j].isShown;
      var isMine = gBoard[i][j].isMine;
      var isExploded = gBoard[i][j].isExploded;
      var classes = '';
      var forceShow = showMines && isMine;
      if (isShown) {
        classes = 'shown '
      }
      if (isExploded) {
        classes += 'exploded';
      }
      var functionClickCall = "clickSquare({ i: "+i+", j:"+j+"})";
      var functionRightClickCall = "javascript:flagSquare({ i: "+i+", j:"+j+"});return false;";
      strHTML += '<td class="square '+ classes +'" onclick="'+ functionClickCall +'" oncontextmenu="'+ functionRightClickCall +'">'
      strHTML += getSquareElement({ i: i, j: j }, forceShow)
      strHTML += '</td>'
    }
    strHTML += '</tr>'
  }
  elBoard.innerHTML = strHTML;
}