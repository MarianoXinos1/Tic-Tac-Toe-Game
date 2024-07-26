import { winnerCombo } from "./const"


const checkWinner = (boardToCheck) =>{
    for (const combo of winnerCombo){
      const [a,b,c] = combo
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){         //EL doble && = se utiliza para realizar una evaluación condiciones lógicas(true o false), comúnmente para renderizar condicionalmente un bloque de código. 
        return boardToCheck[a] // x u o
      }
    }
    // si no hay ganador
    return null 
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)                                // every = es un método de array que verifica si todos los elementos del array cumplen con una condición.
  }

  export {checkWinner, checkEndGame}                                                 //  no puedes usar export default con múltiples exportaciones, debes usar exportaciones nombradas