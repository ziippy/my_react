import { useEffect, useState } from "react";
import { getFoods } from "../api";
import FoodList from "./FoodList";

const LIMIT = 10;

function App() {
    const [order, setOrder] = useState("createdAt");
    const [items, setItems] = useState([]);
    const [cursor, setCursor] = useState(null);

    const handleNewestClick = () => setOrder("createdAt");

    const handleCalorieClick = () => setOrder("calorie");

    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };

    const handleLoad = async (options) => {
        const { foods, paging } = await getFoods(options);
        if (cursor === null) {
            setItems(foods);
        } else {
            setItems((prevItems) => [...prevItems, ...foods]);
        }
        setCursor(paging.nextCursor);
    };

    const handleLoadMore = () => {
        handleLoad({ order, cursor, limit: LIMIT });
    };

    useEffect(() => {
        handleLoad({ order, cursor: null, limit: LIMIT });
    }, [order]);

    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    return (
        <div>
            <button onClick={handleNewestClick}>최신순</button>
            <button onClick={handleCalorieClick}>칼로리순</button>
            <FoodList items={sortedItems} onDelete={handleDelete} />
            {cursor && <button onClick={handleLoadMore}>더보기</button>}
        </div>
    );
}

export default App;
