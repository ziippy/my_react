// import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import HandButton from './HandButton';


// const WINS = {
//   rock: 'scissor',
//   scissor: 'paper',
//   paper: 'rock',
// };

// function getResult(left, right) {
//   if (WINS[left] === right) return '승리';
//   else if (left === WINS[right]) return '패배';
//   return '무승부';
// }

// function handleClick() {
//   console.log('가위바위보!');
// }

// const title = '가위바위보';
// const me = 'rock';
// const other = 'scissor';

// function Hello() {
//   return <h1>안녕 리액트</h1>;
// }

// const element = (
//   <>
//     <Hello />
//     <Hello />
//   </>
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// root.render(<App />);
// root.render(

//   // <Fragment></Fragment> 대신 <></> 를 써도 된다.
//   <>
//     <h1 id="title">{title}</h1>
//     <h2>{getResult(me, other)}</h2>
//     <button onClick={handleClick}>가위</button>
//     <button onClick={handleClick}>바위</button>
//     <button onClick={handleClick}>보</button>
//   </>  
// );
