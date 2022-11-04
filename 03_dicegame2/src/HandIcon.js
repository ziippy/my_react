const rock = "./assets/rock.svg";
const scissor = "./assets/scissor.svg";
const paper = "./assets/paper.svg";

function HandIcon({value}) {
    // console.log(value);
    const targetImg = value === 'rock' ? rock : (value === 'scissor' ? scissor : paper);
    return <img src={targetImg} alt={value} />
}

export default HandIcon;


