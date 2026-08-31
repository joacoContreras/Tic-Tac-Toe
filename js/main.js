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

function createPlayer(name, record) {
    const {} = createPlayer(name);

    const getRecord = () => record;
    const increaseRecord = () => { record++; };
    return {
        name,
        getRecord,
        increaseRecord,
    };
}

const gameController = (() => {

})

const displayController = (() => {

})