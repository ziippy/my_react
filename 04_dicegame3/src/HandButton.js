import HandIcon from './HandIcon';

const pupple = "./assets/purple.svg";

const handButtonStyle = {
    width: '166px',
    height: '166px',
    border: 'none',
    outline: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    backgroundImage: `url(${pupple})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
}

function HandButton(props) {
    // console.log(props)
    const handleClick = () => props.onClick(props.value);
    return (
        <button style={handButtonStyle} onClick={handleClick}>
            <HandIcon value={props.value}/>
        </button>
    );
}

export default HandButton;