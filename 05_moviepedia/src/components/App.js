import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

function App() {
    // const [items, setItems] = useState(mockItems);
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState("createdAt");
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");
    const handleBestClick = () => setOrder("rating");

    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };

    const handleLoad = async (orderQuery) => {
        const { reviews } = await getReviews(orderQuery);
        setItems(reviews);
    };

    // handleLoad();   // 여기서 이렇게 쓰면 무한루프에 빠진다.
    // 컴포넌트가 처음 렌더링 될 때만 request 를 보내고 싶으면 useEffect 를 사용해야 함.
    // useEffect(() => {
    //     handleLoad();
    // }, []);
    // useEffect 는 처음 handleLoad 를 부르고, 이후 dependency list 가 바뀔때만 handleLoad 를 부른다.
    useEffect(() => {
        handleLoad(order);
    }, [order]);

    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>베스트순</button>
            </div>
            <ReviewList items={sortedItems} onDelete={handleDelete} />
        </div>
    );
}

export default App;
