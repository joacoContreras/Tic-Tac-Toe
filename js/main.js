// ==========================================================================
// Entities & State
// ==========================================================================
const gameboard = (() => {
    let positions = ["", "", "", "", "", "", "", "", ""];

    const add = (index, marker) => {
        // Validamos que la posicion este vacia antes de agregar la ficha
        if (positions[index] === "") {
            positions[index] = marker;
            return true; // Jugada exitosa
        }
        return false; // Si el casillero ya estaba ocupado
    };

    const reset = () => {
        positions = ["", "", "", "", "", "", "", "", ""];
    };

    const getState = () => {
        return[...positions]; // Retornamos una copia del arreglo
    };

    return { add, getState, reset };
})();

const createPlayer = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return { getMarker, getName };
};

const gameController = (() => {
    let players = [];
    let activePlayerIndex = 0;
    let isGameOver = false;
    let winner = null;

    const startGame = (player1, player2) => {
        players = [player1, player2];
        activePlayerIndex =  Math.floor(Math.random() * 2);
        isGameOver = null;
        winner = null;
        gameboard.reset();
        console.log('${player[activePlayerIndex].getName()} starts...!');
    };

    const getActivePlayer = () => players[activePlayerIndex];
    const isOver = () => isGameOver;
    const getWinner = () => winner;

    const switchPlayerTurn = () => {
        activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
    };

    const checkWin = (board) => {
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [1, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
        return winConditions.some(([a, b, c]) => {
            return board[a] !== "" && board[a] === board[b] && board[b] === board[c];
        });
    };

    const playRound = (boardIndex) => {
        if (isGameOver) return;
        const currentPlayer = getActivePlayer();
        const successfulMove = gameboard.add(boardIndex, currentPlayer.getMarker());
        if (!successfulMove) return; // Casillero ocupado

        const currentBoard = gameboard.getState();

        if (checkWin(currentBoard)) {
            isGameOver = true;
            winner = currentPlayer;
            return;
        }

        if (!currentBoard.includes("")) {
            isGameOver = true;
            winner = "tie";
            return;
        }

        switchPlayerTurn();
        console.log('${getActivePlayer().getName()} turn!');
    };

    return { startGame, playRound, getActivePlayer, isOver, getWinner };
})();

// ==========================================================================
// Display Controller (Manejo del DOM del Tablero)
// ==========================================================================
const displayController = (() => {
    const boardElement = document.querySelector('#board');
    const statusElement = document.querySelector('#game-status');
    const gameContainer = document.querySelector('.game-container');
    const formElement = document.querySelector('.start-form');
    const restartBtn = document.querySelector('#restart-btn');

    const updateScreen = () => {
        // Limpiamos el tablero visual
        boardElement.innerHTML = '';

        const boardState = gameboard.getState();
        const activePlayer = gameController.getActivePlayer();

        if (gameController.isOver()) {
            const winner = gameController.getWinner();
            if (winner === 'tie') {
                statusElement.textContent = "It's a tie!"
            } else {
                statusElement.textContent = '${winner.getName()} wins the game!';
            }
        } else {
            statusElement.textContent = 'Its ${activePlayer.getName()} (${activePlayer.getMarker()}) turn!';
        }

        boardState.forEach((marker, index) => {
            const cell = document.createElement('button');
            cell.classList.add('cell');
            cell.dataset.index = index;
            cell.textContent = marker;

            cell.addEventListener('click', () => {
                gameController.playRound(index);
                updateScreen();
            });

            boardElement.appendChild(cell);
        });
    };

    const showGame = () => {
        formElement.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        updateScreen();
    };

    // Restart Btn
    restartBtn.addEventListener('click', () => {
        gameboard.reset();
        gameController.startGame(
            gameController.getActivePlayer(),
            gameController.getActivePlayer()
        );
        updateScreen();
    });

    return { showGame, updateScreen};
})();

// ==========================================================================
// Main Events
// ==========================================================================
const gameStartForm = document.querySelector('.start-form');

gameStartForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name1 = document.querySelector('#player1').value.trim();
    const name2 = document.querySelector('#player2').value.trim();

    if (!name1 || !name2) return;

    const player1 = createPlayer(name1, "X");
    const player2 = createPlayer(name2, "O");

    gameController.startGame(player1, player2);
    displayController.showGame();
});

// ==========================================================================
// DOM Rendering
// ==========================================================================
gameStartForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name1 = document.querySelector('#player1').value;
    const name2 = document.querySelector('#player2').value;

    const player1 = createPlayer(name1, "X");
    const player2 = createPlayer(name2, "O");

    gameStartForm.reset();
    FormData.style.display = 'none';

    console.log('Starting game... ${player1.getName()} vs ${player2.getName()}');
});