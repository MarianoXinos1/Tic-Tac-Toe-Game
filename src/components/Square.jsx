
const Square = ({ children, isSelected, updateBoard, index }) => {

    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      updateBoard(index)                                                                       //Le pasamos el index para saber en que cuadrado hizo el click
    }
    return (
      <div onClick={handleClick} className = {className} >
          {children}                                                                           {/* {children} será reemplazado por el valor de {index}, {children} se refiere a los componentes o elementos que se pasan dentro de las etiquetas de apertura y cierre de un componente.  */}
      </div>
    )
  }
  
  export default Square;