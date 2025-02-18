let form = document.getElementById('game-form');
let container = document.querySelector('.container');

form.addEventListener('submit', function(event) {
    event.preventDefault();  

    // Get player names and trim any leading/trailing spaces
    let player1 = document.getElementById('player1').value.trim();
    let player2 = document.getElementById('player2').value.trim();

    // Initialize game variables
    let players = [player1, player2];
    let currentPlayerIndex = 0;  // Player 1 starts
    let board = ['', '', '', '', '', '', '', '', ''];  // Track moves (empty cells)
    let isGameOver = false;

    // Render the game board
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
            let index = box.getAttribute('id') - 1;
            
            // Check if cell is empty and the game is not over
            if (board[index] === '' && !isGameOver) {
                board[index] = currentPlayerIndex === 0 ? 'X' : 'O'; // Update board with current player's symbol
                box.innerText = board[index];  // Display the symbol on the button

                // Check if current player has won
                if (checkWin(board)) {
                    isGameOver = true;
                    // Delay the victory message by 1 second
                    setTimeout(function() {
                        document.querySelector('.message').innerText = `${players[currentPlayerIndex]} Congratulations, you won!`;
                    }, 1000);  // 1-second delay
                } else {
                    // Switch to the other player
                    currentPlayerIndex = 1 - currentPlayerIndex;
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
                console.log('Win condition met for:', board[a]);  // Debug log
                return true;  // Found a winner
            }
        }
        return false;  // No winner yet
    }
});
