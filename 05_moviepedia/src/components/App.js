import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import { useEffect, useState } from "react";
import { createReview, deleteReview, getReviews, updateReview } from "../api";
import ReviewForm from "./ReviewForm";

const LIMIT = 6;

function App() {
    // const [items, setItems] = useState(mockItems);
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState("createdAt");
    const [offset, setOffset] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);

    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");
    const handleBestClick = () => setOrder("rating");

    const handleDelete = async (id) => {
        const result = await deleteReview(id);
        if (!result) return;
        // 아래는 동기방식
        // const nextItems = items.filter((item) => item.id !== id);
        // setItems(nextItems);

        // 이제 async 로 됬기 때문에, 콜백 방식으로 지정해야 햔다.
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleLoad = async (options) => {
        let result;
        try {
            setIsLoading(true);
            setLoadingError(null);
            result = await getReviews(options);
        } catch (error) {
            // console.error(error.message);
            setLoadingError(error);
            // console.log(loadingError);
            return;
        } finally {
            setIsLoading(false);
        }

        const { reviews, paging } = result;
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

    const handleCreateSuccess = (review) => {
        setItems((prevItems) => [...[review, ...prevItems]]);
    };

    const handleUpdateSuccess = (review) => {
        setItems((prevItems) => {
            const splitIdx = prevItems.findIndex(
                (item) => item.id === review.id
            );
            return [
                ...prevItems.slice(0, splitIdx),
                review,
                ...prevItems.slice(splitIdx + 1),
            ];
        });
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
            <ReviewForm
                onSubmit={createReview}
                onSubmitSuccess={handleCreateSuccess}
            />
            <ReviewList
                items={sortedItems}
                onDelete={handleDelete}
                onUpdate={updateReview}
                onUpdateSuccess={handleUpdateSuccess}
            />
            {hasNext && (
                <button disabled={isLoading} onClick={handleLoadMore}>
                    더 보기
                </button>
            )}
            {loadingError?.message && <span>{loadingError.message}</span>}
        </div>
    );
}

export default App;
