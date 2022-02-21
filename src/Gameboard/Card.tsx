import { useState } from "react"


const Card: React.FC<{ word: {text: string, id: number}, 
    onTurnAround: (id: number)=>void, guessed: boolean,
     canTurn: boolean, turned: boolean }> = (props) => {
    const [isTurned, setIsTurned] = useState(false)

    function turnAround() {
        if(props.guessed || !props.canTurn) return
        setIsTurned(true)
        props.onTurnAround(props.word.id)
    }

    return (
        <div
        onClick={turnAround}
        className="h-full bg-red-300 flex justify-center 
        items-center cursor-pointer">
            {isTurned || props.guessed || props.turned ? <p>{props.word.text}</p>:''}
        </div>
    )
}

export default Card