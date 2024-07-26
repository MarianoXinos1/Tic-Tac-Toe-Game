import Square from "./Square.jsx"

const Winner = ({winner, resetGame}) => {
    
    if(winner === null) return null

    const winnerText = winner === false ? 'Tie' : 'The winner is:'   

    //Dejamos la parte del renderizado lo mas limpia posible
    return(                                                                   
        <section className='winner'>
            <div className='text'>
            <h2> {winnerText} </h2>
            
            <header className='win'>
                {winner && <Square>{winner}</Square>}                                { /*EL doble && = se utiliza para realizar una evaluación condiciones lógicas(true o false), comúnmente para renderizar condicionalmente un bloque de código.*/ }
            </header>

            <footer>
                <button onClick={resetGame}> Start again</button>
            </footer>
            </div>
        </section>          
    )
}

export default Winner