import { useEffect, useState } from "react";
import { createFood, deleteFood, getFoods, updateFood } from "../api";
import { LocaleProvider } from "../context/LocaleContext";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import LocaleSelect from "./LocaleSelect";

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
        <LocaleProvider defaultValue="ko">
            <div>
                <LocaleSelect />
                <button onClick={handleNewestClick}>?????????</button>
                <button onClick={handleCalorieClick}>????????????</button>
                <form onSubmit={handleSearchSubmit}>
                    <input name="search" />
                    <button type="submit">??????</button>
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
                        ?????????
                    </button>
                )}
                {loadingError?.message && <span>{loadingError.message}</span>}
            </div>
        </LocaleProvider>
    );
}

export default App;
