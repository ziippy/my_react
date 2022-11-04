import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';
import { useState } from 'react';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

const INITIAL_VALUE = 'rock';

function App() {
  // hand와 otherHand를 state로 바꾸어 주세요
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [bet, setBet] = useState(1);
  const [meScore, setMeScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);

  const handleButtonClick = (nextHand) => {
    // hand의 값을 nextHand 로 바꿔주세요
    // otherHand의 값을 generateRandomHand()의 리턴 값으로 바꿔주세요
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    // gameHistory에 nextHistoryItem 을 추가해주세요
    setGameHistory([...gameHistory, nextHistoryItem]);
    // score 갱신
    if (nextHistoryItem === '승리') {
      setMeScore(meScore + bet);
    } else if (nextHistoryItem === '패배') {
      setOtherScore(otherScore + bet);
    }
  };

  const handleClearClick = () => {
    // hand와 otherHand의 값을 'rock' 으로 변경해주세요
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    // gameHistory를 비워주세요
    setGameHistory([]);
    // 점수 초기화
    setMeScore(0);
    setOtherScore(0);
  };

  const handleBetChange = (event) => {
    var value = parseInt(event.target.value);
    if (value < 1 || value > 9) {
      value = 1;
    }
    setBet(value);
    // console.log(value);
  }

  return (
    <div>
      <Button onClick={handleClearClick}>처음부터</Button>
      <p>{getResult(hand, otherHand)}</p>
      <p>{meScore} : {otherScore}</p>
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={otherHand} />
      </div>
      <input type='number' value={bet} onChange={handleBetChange} />
      <p>승부 기록: {gameHistory.join(', ')}</p>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
