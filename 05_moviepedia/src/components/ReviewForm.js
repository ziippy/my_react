import { useState } from "react";
import "./ReviewForm.css";

function ReviewForm() {
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleRatingChange = (e) => {
        const nextRating = Number(e.target.value) || 0;
        setRating(nextRating);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, rating, content });
    };

    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
            <input value={title} onChange={handleTitleChange}></input>
            <input
                value={rating}
                onChange={handleRatingChange}
                type="number"
            ></input>
            <textarea value={content} onChange={handleContentChange}></textarea>
            <button type="submit">확인</button>
        </form>
    );
}

export default ReviewForm;

// react 에서는 onchange 를 사용하면 사용자가 input 에 입력을 하면 계속 이벤트가 발생한다.
// 보통 input 에서는 onInput 이 그런 이벤트를 발생하지만, react 에서는 onChange 이름이 보다 더 직관적이라고 판단하고 이벤트명을 그렇게 한 것이다.
