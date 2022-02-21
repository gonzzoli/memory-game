import { useEffect, useMemo, useState } from "react"
import Card from "./Card"

type word = {
    text: string,
    id: number
}

let words = [
    {text: 'cocina', id: 0},
    {text: 'botas', id: 1},
    {text: 'microondas', id: 2},
    {text: 'manos', id: 3},
    {text: 'pies', id: 4},
    {text: 'pan', id: 5},
    {text: 'fideos', id: 6},
    {text: 'puerta', id: 7},
]
let words2:word[] = []

words.forEach(word => {
    words2.push({...word, id: word.id+8})
})
words = [...words, ...words2]
words = disorder(words)

function disorder(words: word[]) {
    return words.sort((a, b) => Math.random()<0.5 ? -1 : 1)
}

function findWordById(id: number) {
    return words.find(word => word.id === id)
}

const Gameboard: React.FC = () => {
    const [randWords, setRandWords] = useState(words)
    const [turnedWordsId, setTurnedWordsId] = useState<number[]>([])
    const [score, setScore] = useState(0)
    const [guessed, setGuessed] = useState<string[]>([])
    const [canTurn, setCanTurn] = useState(true)
    const [started, setStarted] = useState(false)
    const [timeCounter, setTimeCounter] = useState(0)

    const cardElements = useMemo(() => 
        randWords.map(word => {
            if(guessed.includes(word.text) || turnedWordsId.includes(word.id)) {
                return <Card key={Math.random()}
                word={word} onTurnAround={()=>{}} canTurn={canTurn} guessed={true} turned={true} />
            }
            return <Card key={Math.random()}
            word={word} onTurnAround={listWord} canTurn={canTurn} guessed={false} turned={false} />

    }), [randWords, guessed, canTurn])

    useEffect(() => {
        if(turnedWordsId.length===1) setStarted(true)
        if(turnedWordsId.length===2) {
            if(findWordById(turnedWordsId[0])!.text === findWordById(turnedWordsId[1])!.text) {
                setScore(score+1)
                setTurnedWordsId([])
                setGuessed(prevState => prevState.concat(findWordById(turnedWordsId[0])!.text))
                return
            }
            setCanTurn(false)
            setTimeout(() => {
                setRandWords(prevState => [...prevState])
                setTurnedWordsId([])
                setCanTurn(true)
            }, 500)
        }
    }, [turnedWordsId])
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('a')
            if(!started) return
            setTimeCounter(prevTime => prevTime+1)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [started])
    

    useEffect(() => {
        if(score!==words.length/2) return
        setStarted(false)
    }, [score])

    function randomize() {
        setRandWords(disorder([...words]))
    }

    function listWord(id: number) {
        setTurnedWordsId(prevWords => prevWords.concat(id))
    }

    return (
        <section>
            <div>
                <p className="text-3xl mb-10">Score: {score}/{words.length/2}</p>
                <p>Time: {Math.floor(timeCounter/60).toLocaleString('en-EN', {
                    minimumIntegerDigits: 2,
                    useGrouping: true
                })} : {(timeCounter%60).toLocaleString('en-EN', {
                    minimumIntegerDigits: 2,
                    useGrouping: true
                })}</p>
            </div>
            <div className="h-[50vh] grid grid-cols-4 grid-rows-4 
            gap-7">
                {cardElements}
            </div>
            <button onClick={randomize}>Randomize</button>
        </section>
    )
}

export default Gameboard