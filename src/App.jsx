import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'

}

const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)                                                           //Le pasamos el index para saber en que cuadrado hizo el click
  }
  return (
    <div onClick={handleClick} className = {className} >
        {children}                                                              {/* {children} será reemplazado por el valor de {index}, {children} se refiere a los componentes o elementos que se pasan dentro de las etiquetas de apertura y cierre de un componente.  */}
    </div>
  )
}


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))                      // El primer elemento es el estado actual y el segundo elemento es una función que permite actualizar el estado. En este caso, solo necesitamos el estado actual*/}
  
  const[turn,setTurn] = useState(TURNS.X)                                      //Con el punto accede a la propiedad X del objeto TURNS


  const updateBoard = (index) => {
    //Si la posicion tiene algo, no hagas nada (para que no se sobrescriba el turn)
    if(board[index]){
      return;
    } 

    // Actualiza el tablero
    const newBoard = [...board]                                               // Copialo datos pero en un nuevo array con el Spread Operator, siempre apra actualizar buena practica que sea en uno nuevo.
    newBoard[index] = turn                                                   // Asigna el valor de turn (que puede ser 'X' o 'O') al índice index en el nuevo array 
    setBoard(newBoard)                                                      

    // Cambio de turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  return (
       <main className='board'>
        <h1>Tic Tac Toe</h1>
        <section className='game'>
          {
            board.map((cell, index) =>{                                        //Primera posición del parametro =  el elemento actual del array que se está iterando, y la segunda posición= para el índice de ese elemento
              return (
                <Square key={index} index={index} updateBoard={updateBoard}>   {/* Se pasa la funcion = updateBoard, no la ejecucion de la funcion = updateBoard(). Porque queres que la ejecute solo al hacer click */}
                  {board[index]}
                </Square>
              )
            })
          }
        </section> 

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>
              {TURNS.X} 
          </Square>
          <Square isSelected={turn === TURNS.O}>
              {TURNS.O} 
          </Square>   
        </section>  
       </main>
    
  )
}

export default App
