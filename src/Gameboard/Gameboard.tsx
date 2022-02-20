import { useState } from "react"
import Card from "./Card"

let words = ['caca', 'popo', 'pis', 'pies', 'manos', 'microondas']
words = words.concat(words)

function disorder(words: string[]) {
    return words.sort((a, b) => Math.random()<0.5 ? -1 : 1)
}

const Gameboard: React.FC = () => {
    const [randWords, setRandWords] = useState(disorder(words))

    function randomize() {
        setRandWords(disorder(words))
    }

    return (
        <section className=" grid">
            {randWords.map(word => <Card text={word} />)}
            <button onClick={randomize}>aaaaaaaaa</button>
        </section>
    )
}

export default Gameboard