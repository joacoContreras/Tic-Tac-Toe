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

    const getState = () => {
        return[...positions]; // Retornamos una copia del arreglo
    };

    return { add, getState};
})();

const createPlayer = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return { getMarker, getName };
};

const gameController = (() => {
    let players = [];
    let activePlayerIndex;
    let turnCount = 0;
    
    const startGame = (player1, player2) => {
        players = [player1, player2];
        activePlayerIndex =  Math.floor(Math.random() * 2);
        turnCount = 0;
        console.log('${player[activePlayerIndex].getName()} starts...!');
    };

    const getActivePlayer = () => players[activePlayerIndex];

    const switchPlayerTurn = () => {
        activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
    };

    const playRound = (boardIndex) => {
        const currentPlayer = getActivePlayer();

        const successfulMove = gameboard.add(boardIndex, currentPlayer.getMarker());
        if (!successfulMove) return; // Casillero ocupado

        turnCount++;

        const checkWin = (board) => {
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [1, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (let i = 0; i < winConditions.length; i++) {
                const [a, b, c] = winConditions[i];

                if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
                    return true;
                }
            }

            return false;
        };

        if (turnCount === 9) {
            console.log("Game Over! It's a tie!");
            return;
        }

        switchPlayerTurn();
        console.log('${getActivePlayer().getName()} turn!');
    };

    return { startGame, playRound, getActivePlayer };
})();

const displayController = (() => {

})

// ==========================================================================
// DOM Rendering
// ==========================================================================
const gameStartForm = document.querySelector('.start-form');
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