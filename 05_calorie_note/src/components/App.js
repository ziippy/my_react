import FoodList from "./FoodList";
// import mockItems from "../mock.json";
import { useState } from "react";
import { getFoods } from "../api";

function App() {
  // console.log(mockItems);
  // const [items, setItems] = useState(mockItems);
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleHighestClick = () => setOrder("calorie");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoadClick = async () => {
    const { foods } = await getFoods();
    setItems(foods);
  };

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleHighestClick}>칼로리순</button>
      </div>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      <button onClick={handleLoadClick}>불러오기</button>
    </div>
  );
}

export default App;
