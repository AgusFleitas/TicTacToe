import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

function App() {

  // Estado para crear el tablero.
  const [board, setBoard] = useState(Array(9).fill(null));

  // Estado para setear el turno.
  const [turn, setTurn] = useState(TURNS.X);

  // Estado para setear el ganador.
  const [winner, setWinner] = useState(null)

  // Resetear el juego volviendo los estados a sus valores iniciales.
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  // Función que se ejecuta para actualizar el tablero.
  const updateBoard = (index) => {
    // No actualizar el Square si ya hay algo o si hay un ganador.
    if(board[index] || winner) return
    // Copia de tablero.
    const newBoard = [...board]
    // Accedemos al Square del tablero en el que se hizo click mediante su índice y le asignamos el valor de quien sea el turno actual.
    newBoard[index] = turn
    // Seteamos el tablero con el valor actualizado.
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Revisar si hay ganador.
    const newWinner = checkWinnerFrom(newBoard)
      // Si hay ganador se ejecuta el confetti y se setea el estado de ganador. Si no hay ganador, se comprueba que el juego finalizó en empate y se setea el ganador en 'false'.
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square 
            key={index} 
            index={index}
            updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  );
}

export default App;
