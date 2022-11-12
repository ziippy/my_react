import { useState } from "react";
// import { createReview, updateReview } from "../api";
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";

const INITIAL_VALUES = {
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
};

function ReviewForm({
    initialValues = INITIAL_VALUES,
    initialPreview,
    onCancel,
    onSubmit,
    onSubmitSuccess,
}) {
    const t = useTranslate();
    // const [title, setTitle] = useState("");
    // const [rating, setRating] = useState(0);
    // const [content, setContent] = useState("");
    const [values, setValues] = useState(initialValues);
    // 아래 부분을 Custom Hook 으로 변경
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [submittingError, setSubmittingError] = useState(null);
    const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);

    // const handleTitleChange = (e) => {
    //     setTitle(e.target.value);
    // };

    // const handleRatingChange = (e) => {
    //     const nextRating = Number(e.target.value) || 0;
    //     setRating(nextRating);
    // };

    // const handleContentChange = (e) => {
    //     setContent(e.target.value);
    // };

    const handleChange = (name, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log({ title, rating, content });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);
        //
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("rating", values.rating);
        formData.append("content", values.content);
        formData.append("imgFile", values.imgFile);

        // let result;
        // try {
        //     setSubmittingError(null);
        //     setIsSubmitting(true);
        //     // result = await onSubmit(formData); // 이렇게 하면 updateReview 이 적용될 때 안되더라... 그래서 임시 방편으로 분리
        //     if (values.id !== undefined) {
        //         result = await updateReview(values.id, formData);
        //     } else {
        //         result = await createReview(formData);
        //     }
        //     // console.log("result:", result);
        // } catch (error) {
        //     setSubmittingError(error);
        //     return;
        // } finally {
        //     setIsSubmitting(false);
        // }
        // Custom Hook 으로 변경
        const result = await onSubmitAsync(formData);
        if (!result) return;

        const { review } = result;
        setValues(INITIAL_VALUES);
        onSubmitSuccess(review);
    };

    // return (
    //     <form className="ReviewForm" onSubmit={handleSubmit}>
    //         <input value={title} onChange={handleTitleChange}></input>
    //         <input
    //             value={rating}
    //             onChange={handleRatingChange}
    //             type="number"
    //         ></input>
    //         <textarea value={content} onChange={handleContentChange}></textarea>
    //         <button type="submit">확인</button>
    //     </form>
    // );

    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
            <FileInput
                name="imgFile"
                value={values.imgFile}
                initialPreview={initialPreview}
                onChange={handleChange}
            ></FileInput>
            <input
                name="title"
                value={values.title}
                onChange={handleInputChange}
            ></input>
            <RatingInput
                name="rating"
                value={values.rating}
                onChange={handleChange}
            ></RatingInput>
            <textarea
                name="content"
                value={values.content}
                onChange={handleInputChange}
            ></textarea>
            {onCancel && (
                <button onClick={onCancel} disabled={isSubmitting}>
                    {t("cancel button")}
                </button>
            )}
            <button type="submit" disabled={isSubmitting}>
                {t("confirm button")}
            </button>
            {submittingError?.message && <div>{submittingError.message}</div>}
        </form>
    );
}

export default ReviewForm;

// react 에서는 onchange 를 사용하면 사용자가 input 에 입력을 하면 계속 이벤트가 발생한다.
// 보통 input 에서는 onInput 이 그런 이벤트를 발생하지만, react 에서는 onChange 이름이 보다 더 직관적이라고 판단하고 이벤트명을 그렇게 한 것이다.
