import {useState} from "react";

import Character from "./components/Character";
import BarList from "./components/BarList";
import MainActions from "./components/MainActions";

const config = {
  bars: [
    {
      id: 1,
      image: "heart",
      alt: "Heart",
      quantity: 3,
      color: "red"
    },
    {
      id: 2,
      image: "potion",
      alt: "Health",
      quantity: 5,
      color: "cyan"
    }
  ],
};

const getInitialCount = () => {
  const result = {};
  config.bars.forEach(bar => {
    result[bar.id] = bar.quantity
  });
  return result;
}

function App() {
  const [count, setCount] = useState(() => getInitialCount());
  const [gameOver, setGameOver] = useState(false);

  const handleMainAction = () => {
    let result = {}
    const heartId = config.bars[0].id;
    const healthId = config.bars[1].id;

    if(count[healthId] > 1){
      result[healthId] = count[healthId] - 1;
    }else {
      if(count[heartId] > 1){
        result[heartId] = count[heartId] - 1;
        result[healthId] = config.bars[1].quantity;
      }else {
        result[heartId] = 0;
        result[healthId] = 0;
        setGameOver(true);
      }
    }

    setCount({...count, ...result});
  }

  return (
    <main>
      {!gameOver && <>
        <Character />
        <BarList barsConfig={config.bars} fillLevels={count}/>
        <MainActions onSwordClick={handleMainAction}/>
      </>}
      {gameOver && <p>Game Over</p>}
    </main>
  );
}

export default App;
