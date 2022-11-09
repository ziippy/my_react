import { useEffect, useState } from "react";
import { getFoods } from "../api";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";

const LIMIT = 10;

function App() {
    const [order, setOrder] = useState("createdAt");
    const [items, setItems] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);
    const [search, setSearch] = useState("");

    const handleNewestClick = () => setOrder("createdAt");

    const handleCalorieClick = () => setOrder("calorie");

    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };

    const handleLoad = async (options) => {
        let result;
        try {
            setIsLoading(true);
            setLoadingError(null);
            result = await getFoods(options);
        } catch (error) {
            setLoadingError(error);
            return;
        } finally {
            setIsLoading(false);
        }
        // const { foods, paging } = await getFoods(options);
        const {
            foods,
            paging: { nextCursor },
        } = result;
        if (!options.cursor) {
            setItems(foods);
        } else {
            setItems((prevItems) => [...prevItems, ...foods]);
        }
        setCursor(nextCursor);
    };

    const handleLoadMore = () => {
        handleLoad({ order, cursor, limit: LIMIT, search });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch(e.target["search"].value);
    };

    const handleSubmitSuccess = (food) => {
        setItems((prevItems) => [...[food, ...prevItems]]);
    };

    useEffect(() => {
        handleLoad({ order, cursor: null, limit: LIMIT, search });
    }, [order, search]);

    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    return (
        <div>
            <button onClick={handleNewestClick}>최신순</button>
            <button onClick={handleCalorieClick}>칼로리순</button>
            <form onSubmit={handleSearchSubmit}>
                <input name="search" />
                <button type="submit">검색</button>
            </form>
            <FoodForm onSubmitSuccess={handleSubmitSuccess} />
            <FoodList items={sortedItems} onDelete={handleDelete} />
            {cursor && (
                <button disabled={isLoading} onClick={handleLoadMore}>
                    더보기
                </button>
            )}
            {loadingError?.message && <span>{loadingError.message}</span>}
        </div>
    );
}

export default App;
