import { useEffect, useState } from "react";
import { createFood, deleteFood, getFoods, updateFood } from "../api";
import LocaleContext from "../context/LocaleContext";
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

    const handleDelete = async (id) => {
        const result = await deleteFood(id);
        if (!result) return;
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
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

    const handleCreateSuccess = (food) => {
        setItems((prevItems) => [...[food, ...prevItems]]);
    };

    const handleUpdateSuccess = (food) => {
        setItems((prevItems) => {
            const splitIdx = prevItems.findIndex((item) => item.id === food.id);
            return [
                ...prevItems.slice(0, splitIdx),
                food,
                ...prevItems.slice(splitIdx + 1),
            ];
        });
    };

    useEffect(() => {
        handleLoad({ order, cursor: null, limit: LIMIT, search });
    }, [order, search]);

    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    return (
        <LocaleContext.Provider value={"ko"}>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleCalorieClick}>칼로리순</button>
                <form onSubmit={handleSearchSubmit}>
                    <input name="search" />
                    <button type="submit">검색</button>
                </form>
                <FoodForm
                    onSubmit={createFood}
                    onSubmitSuccess={handleCreateSuccess}
                />
                <FoodList
                    items={sortedItems}
                    onDelete={handleDelete}
                    onUpdate={updateFood}
                    onUpdateSuccess={handleUpdateSuccess}
                />
                {cursor && (
                    <button disabled={isLoading} onClick={handleLoadMore}>
                        더보기
                    </button>
                )}
                {loadingError?.message && <span>{loadingError.message}</span>}
            </div>
        </LocaleContext.Provider>
    );
}

export default App;
