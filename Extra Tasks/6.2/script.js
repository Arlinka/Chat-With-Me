let startBoard;
const winCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 4, 2],
  [6, 7, 8],
];

const cells = document.querySelectorAll("td");

const startGame = () => {
  startBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].innterText = "";
    cells[i].addEventListener("click", turnClick, false);
  }
};

const turnClick = (square) => {
  if (typeof startBoard[square.target.id] === "number") {
    turnAi(square.target.id, "X");
    if (!checkTie()) turnAi(emptyCells()[0], "0");
  }
};

const turnAi = (squareID, player) => {
  startBoard[squareID] = player;
  document.getElementById(squareID).innerText = player;
  let gameWon = checkWin(startBoard, player);
  gameWon ? gameOver(gameWon) : false;
};

const checkWin = (board, player) => {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of winCombinations.entries())
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  return gameWon;
};

const gameOver = (gameWon) => {
  for (let i = 0; i < cells.length; i++)
    cells[i].removeEventListener("click", turnClick, false);
  document.body.append(
    gameWon.player === "X" ? "Вы выиграли!" : "Вы проиграли!"
  );
};

const emptyCells = () => {
  return startBoard.filter((cells) => typeof cells === "number");
};

const checkTie = () => {
  if (emptyCells().length === 0) {
    for (let i = 0; i < cells.length; i++)
      cells[i].removeEventListener("click", turnClick, false);
    document.body.append("Ничья!");
    return true;
  }
  return false;
};

const reloadGame = () => {
  location.reload();
  startGame();
};

document.querySelector("button").addEventListener("click", reloadGame);

startGame();
