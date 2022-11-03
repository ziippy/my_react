import HandIcon from './HandIcon';

function HandButton(props) {
    // console.log(props)
    const handleClick = () => props.onClick(props.value);
    return (
        <button onClick={handleClick}>
            <HandIcon value={props.value}/>
        </button>
    );
}

export default HandButton;