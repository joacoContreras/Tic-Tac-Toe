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

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

const gameController = (() => {

})

const displayController = (() => {

})