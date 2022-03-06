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
