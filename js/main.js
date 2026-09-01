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

})

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