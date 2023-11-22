import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  // Revisamos todas las combinaciones ganadoras para ver si 'X' o 'O' ganó.
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }

  // Si no hay ganador...
  return null;
};

// Función que determina si el juego terminó en empate.
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
