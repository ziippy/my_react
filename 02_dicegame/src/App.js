import Button from './Button';
import HandButton from './HandButton';

function App() {
  const handleClick = (value) => console.log(value);
  return (
    <div>
        <div>
            <Button>던지기</Button>
            <Button>처음부터</Button>
        </div>
        <HandButton value="rock" onClick={handleClick} />
        <HandButton value="scissor" onClick={handleClick} />
        <HandButton value="paper" onClick={handleClick} />
    </div>
  );
}

export default App;
