import HandIcon from './HandIcon';

import './HandButton.css';

// const pupple = "./assets/purple.svg";

// const handButtonStyle = {
//     width: '166px',
//     height: '166px',
//     border: 'none',
//     outline: 'none',
//     textAlign: 'center',
//     cursor: 'pointer',
//     backgroundColor: 'transparent',
//     backgroundImage: `url(${pupple})`,
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     backgroundSize: 'contain',
// }

function HandButton(props) {
    // console.log(props)
    const handleClick = () => props.onClick(props.value);
    return (
        // <button className={'HandButton'} style={handButtonStyle} onClick={handleClick}>
        <button className={'HandButton'} onClick={handleClick}>
            <HandIcon className={'HandButton-icon'} value={props.value}/>
        </button>
    );
}

export default HandButton;