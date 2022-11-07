import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

const LIMIT = 6;

function App() {
    // const [items, setItems] = useState(mockItems);
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState("createdAt");
    const [offset, setOffset] = useState(0);
    const [hasNext, setHasNext] = useState(false);

    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");
    const handleBestClick = () => setOrder("rating");

    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };

    const handleLoad = async (options) => {
        const { reviews, paging } = await getReviews(options);
        if (options.offset === 0) {
            setItems(reviews);
        } else {
            // setItems([...items, ...reviews]);       // 이렇게 하면 getReviews 가 오래 걸릴 때, items 가 변경되어도, 여기서는 그 전의 items 를 가지고 하는 것이기 때문에 버그가 발생한다.
            // 대신 콜백 적용
            setItems((prevItems) => [...prevItems, ...reviews]); // 이렇게 하면 React 가 setItems 를 부를 때, 해당 시점의 items 값을 인자로 넣어준다.
        }
        setOffset(options.offset + reviews.length);
        setHasNext(paging.hasNext);
        // setItems(reviews);
    };

    const handleLoadMore = () => {
        handleLoad({ order, offset, limit: LIMIT });
    };

    // handleLoad();   // 여기서 이렇게 쓰면 무한루프에 빠진다.
    // 컴포넌트가 처음 렌더링 될 때만 request 를 보내고 싶으면 useEffect 를 사용해야 함.
    // useEffect(() => {
    //     handleLoad();
    // }, []);
    // useEffect 는 처음 handleLoad 를 부르고, 이후 dependency list 가 바뀔때만 handleLoad 를 부른다.
    useEffect(() => {
        handleLoad({ order, offset: 0, limit: LIMIT });
    }, [order]);

    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>베스트순</button>
            </div>
            <ReviewList items={sortedItems} onDelete={handleDelete} />
            {hasNext && <button onClick={handleLoadMore}>더 보기</button>}
        </div>
    );
}

export default App;
