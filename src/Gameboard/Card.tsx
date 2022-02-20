

const Card: React.FC<{ text: string }> = (props) => {
    return (
        <div>
            <p>{props.text}</p>
        </div>
    )
}

export default Card