import './App.css'
import confetti from 'canvas-confetti'
import { useState } from 'react'
import Square from './components/Square.jsx'
import { TURNS } from './const.js'
import { checkWinner, checkEndGame } from './board.js';
import Winner from './components/Winner.jsx'



function App() {
  const [board, setBoard] = useState(() =>{                                  
    const boardFromStorage = window.localStorage.getItem('board')                             // Obtiene el tablero del almacenamiento local
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)             // Si hay un tablero en el almacenamiento local, lo convierte de nuevo en un array.
  })           

  const[turn,setTurn] = useState(() =>{                                                     
    const turnFromStorage = window.localStorage.getItem('turn')                              // Obtiene el turno del almacenamiento local
    return turnFromStorage ?? TURNS.X                                                       // ?? = valdia cuando es null o undefined y si lo es, le da el valor que especificamos = TURN.X en este caso.
  })                                             

  //null = no hay ganador, false = empate
  const [winner, setWinner] = useState(null)                                       

  // resetear tablero, tuno, ganador, storage
  const resetGame = () => {
    setBoard(Array(9).fill(null))                                                           
    setTurn(TURNS.X)                                                                       
    setWinner(null)                                                                       

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    //Si la posicion tiene algo, no hagas nada
    // (para que no se sobrescriba el turn) o si ya hay un ganador
    if(board[index] || winner){
      return;
    } 

    // Actualiza el tablero
    const newBoard = [...board]                                                            // Copialo datos pero en un nuevo array con el Spread Operator, siempre apra actualizar buena practica que sea en uno nuevo.
    newBoard[index] = turn                                                                 // Asigna el valor de turn (que puede ser 'X' o 'O') al índice index en el nuevo array 
    setBoard(newBoard)                                                      

    // Cambio de turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //guardar partida y turno
    window.localStorage.setItem('board', JSON.stringify(newBoard))                      // localStorage = guarda almacenamiento local del navegador un string, usamos el stringify para que el array lo pase a string
    window.localStorage.setItem('turn', newTurn)                                       // guarda el objeto newBoard en el almacenamiento local bajo la clave 'board'


    //chequear si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
      } else if(checkEndGame(newBoard)){
        setWinner(false) //empate
      }
  }

  return (
       <main className='board'>
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}> Game Reset</button>
        <section className='game'>
          {
            board.map((square, index) =>{                                                      //Primera posición del parametro =  el elemento actual del array que se está iterando, y la segunda posición= para el índice de ese elemento
              return (
                <Square key={index} index={index} updateBoard={updateBoard}>                {/* Se pasa la funcion = updateBoard, no la ejecucion de la funcion = updateBoard(). Porque queres que la ejecute solo al hacer click */}
                  {square}
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

       <Winner resetGame={resetGame}  winner={winner}/>
       </main>
  )
}


export default App
