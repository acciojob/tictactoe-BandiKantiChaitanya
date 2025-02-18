let form = document.getElementById('game-form');
let container = document.querySelector('.container');
let currentPlayerIndex = 0;  // Player 1 starts
let board = ['', '', '', '', '', '', '', '', ''];  // Track moves (empty cells)
let isGameOver = false;

form.addEventListener('submit', function(event) {
    event.preventDefault();  
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;

    let players = [player1, player2];

    container.innerHTML = `
        <h1>Tic Tac Toe</h1>
        <div class="message">${players[currentPlayerIndex]}, you're up!</div>
        <div class="game">
            <button class="box" id="1"></button>
            <button class="box" id="2"></button>
            <button class="box" id="3"></button>
            <button class="box" id="4"></button>
            <button class="box" id="5"></button>
            <button class="box" id="6"></button>
            <button class="box" id="7"></button>
            <button class="box" id="8"></button>
            <button class="box" id="9"></button>
        </div>
    `;

    // Add event listeners for each box
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('click', function() {
            let index = box.getAttribute('id') - 1;  // Get the index based on button ID
            if (board[index] === '' && !isGameOver) {  // Check if the cell is empty
                board[index] = currentPlayerIndex === 0 ? 'X' : 'O';  // Assign X or O
                box.innerText = board[index];  // Update the button with X or O

                // Check if the current player has won
                if (checkWin(board)) {
                    document.querySelector('.message').innerText = `${players[currentPlayerIndex]} Congratulations, you won!`;
                    isGameOver = true;
                } else {
                    currentPlayerIndex = 1 - currentPlayerIndex;  // Switch players
                    document.querySelector('.message').innerText = `${players[currentPlayerIndex]}, you're up!`;
                }
            }
        });
    });
});

// Function to check for a winning combination
function checkWin(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]               // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;  // Found a winner
        }
    }
    return false;  // No winner yet
}
