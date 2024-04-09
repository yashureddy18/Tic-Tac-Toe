const board = document.getElementById('board');
const resultDisplay = document.getElementById('result');

let currentPlayer = 'X';
let moves = 0;
let winner = false;

// Create cells for the board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('data-index', i);
  cell.addEventListener('click', handleCellClick);
  board.appendChild(cell);
}

function handleCellClick(event) {
  const cell = event.target;
  if (cell.textContent === '' && !winner) {
    cell.textContent = currentPlayer;
    moves++;
    if (checkWinner()) {
      resultDisplay.textContent = `Player ${currentPlayer} wins!`;
      winner = true;
    } else if (moves === 9) {
      resultDisplay.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWinner() {
  const cells = document.querySelectorAll('.cell');
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a].textContent !== '' &&
           cells[a].textContent === cells[b].textContent &&
           cells[a].textContent === cells[c].textContent;
  });
}

function resetGame() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = '';
  });
  resultDisplay.textContent = '';
  currentPlayer = 'X';
  moves = 0;
  winner = false;
}
