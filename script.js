let form = document.getElementById('game-form');
let container = document.querySelector('.container');

form.addEventListener('submit', function(event) {
    event.preventDefault();  
    let player1 = document.getElementById('player-1').value;
    let player2 = document.getElementById('player-2').value;

    let players = [player1, player2];
    let currentPlayerIndex = 0;  // Player 1 starts
    let board = ['', '', '', '', '', '', '', '', ''];  // Track moves (empty cells)
    let isGameOver = false;

    container.innerHTML = `
        <h1>Tic Tac Toe</h1>
        <div class="message">${players[currentPlayerIndex]}, you're up!</div>
        <div class="game">
            <button class="box" data-index="0"></button>
            <button class="box" data-index="1"></button>
            <button class="box" data-index="2"></button>
            <button class="box" data-index="3"></button>
            <button class="box" data-index="4"></button>
            <button class="box" data-index="5"></button>
            <button class="box" data-index="6"></button>
            <button class="box" data-index="7"></button>
            <button class="box" data-index="8"></button>
        </div>
    `;

    // Add event listeners for each box
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('click', function() {
            let index = box.getAttribute('data-index');
            if (board[index] === '' && !isGameOver) {  // Check if cell is empty
                board[index] = currentPlayerIndex === 0 ? 'X' : 'O'; // Update board with current player's symbol
                box.innerText = board[index];  // Display the symbol on the button

                // Check if current player has won
                if (checkWin(board)) {
                    document.querySelector('.message').innerText = `${players[currentPlayerIndex]} Congratulations, you won!`;
                    isGameOver = true;
                } else {
                    currentPlayerIndex = 1 - currentPlayerIndex;  // Switch to the other player
                    document.querySelector('.message').innerText = `${players[currentPlayerIndex]}, you're up!`;
                }
            }
        });
    });

    // Function to check if there is a winning combination
    function checkWin(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]               // Diagonals
        ];

        // Check each winning pattern
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;  // Found a winner
            }
        }
        return false;  // No winner yet
    }
});
