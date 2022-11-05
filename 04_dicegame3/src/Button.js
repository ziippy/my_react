const style = {
    // background-color: 'pink',  -> must using camel case
    // backgroundColor: 'pink',
    padding: '14px 27px',
    border: 'solid 1px #7090ff',
    outline: 'none',
    color: '#7090ff',
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 89, 255, 0.2)',
    borderRadius: '30px',
    fontSize: '17px',
};

const baseButtonStyle = {
    padding: '14px 27px',
    outline: 'none',
    borderRadius: '30px',
    cursor: 'pointer',    
    fontSize: '17px',
};

const blueButtonStyle = {
    ...baseButtonStyle,  // spread 문법
    backgroundColor: 'rgba(0, 89, 255, 0.2)',
    border: 'solid 1px #7090ff',
    color: '#7090ff',
}

const redButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: 'rgba(255, 78, 78, 0.2)',
    border: 'solid 1px #ff4664',
    color: '#ff4664',
}

function Button({ children, onClick, color }) {
    const buttonStyle = color === 'red' ? redButtonStyle : blueButtonStyle;

    // return <button onClick={onClick}>{children}</button>;
    return <button style={buttonStyle} onClick={onClick}>{children}</button>;
}

export default Button;