// Constante que almacena los cuadrados del tablero.
export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}` 
  
    // Función que se ejecuta cada que clickeamos un cuadrado del tablero.
    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
    <div onClick={handleClick} className={className}>{children}</div>
    );
  };