import { useState } from "react";
import { createFood, updateFood } from "../api";
import useTranslate from "../hooks/useTranslate";
import FileInput from "./FileInput";
import "./FoodForm.css";

// function sanitize(type, value) {
//     switch (type) {
//         case "number":
//             return Number(value) || 0;

//         default:
//             return value;
//     }
// }

const INITIAL_VALUES = {
    title: "",
    calorie: 0,
    content: "",
    imgFile: null,
};

function FoodForm({
    initialValues = INITIAL_VALUES,
    initialPreview,
    onCancel,
    onSubmit,
    onSubmitSuccess,
}) {
    // const [title, setTitle] = useState("");
    // const [calorie, setCalorie] = useState(0);
    // const [content, setContent] = useState("");

    // const handleTitleChange = (e) => {
    //     setTitle(e.target.value);
    // };

    // const handleCalorieChange = (e) => {
    //     const nextCalorie = Number(e.target.value) || 0;
    //     setCalorie(nextCalorie);
    // };

    // const handleContentChange = (e) => {
    //     setContent(e.target.value);
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log({ title, calorie, content });
    // };

    const t = useTranslate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittingError, setSubmittingError] = useState(null);
    const [values, setValues] = useState(initialValues);

    const handleValuesChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    const handleChange = (name, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);
        const formData = new FormData();
        formData.append("imgFile", values.imgFile);
        formData.append("title", values.title);
        formData.append("calorie", values.calorie);
        formData.append("content", values.content);

        let result;
        try {
            setSubmittingError(null);
            setIsSubmitting(true);
            // result = await onSubmit(formData); // 이상하게 안되네...
            if (values.id !== undefined) {
                result = await updateFood(values.id, formData);
            } else {
                result = await createFood(formData);
            }
        } catch (error) {
            setSubmittingError(error);
            return;
        } finally {
            setIsSubmitting(false);
        }
        const { food } = result;
        // console.log(food);
        onSubmitSuccess(food);
        setValues(INITIAL_VALUES);
    };

    // return (
    //     <form className="FoodForm" onSubmit={handleSubmit}>
    //         <input value={title} onChange={handleTitleChange}></input>
    //         <input
    //             value={calorie}
    //             onChange={handleCalorieChange}
    //             type="number"
    //         ></input>
    //         <textarea value={content} onChange={handleContentChange}></textarea>
    //         <button type="submit">확인</button>
    //     </form>
    // );

    return (
        <form className="FoodForm" onSubmit={handleSubmit}>
            <FileInput
                name="imgFile"
                value={values.imgFile}
                initialPreview={initialPreview}
                onChange={handleChange}
            ></FileInput>
            <input
                name="title"
                value={values.title}
                onChange={handleValuesChange}
            ></input>
            <input
                name="calorie"
                value={values.calorie}
                onChange={handleValuesChange}
                type="number"
            ></input>
            <textarea
                name="content"
                value={values.content}
                onChange={handleValuesChange}
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

export default FoodForm;

// react 에서는 onchange 를 사용하면 사용자가 input 에 입력을 하면 계속 이벤트가 발생한다.
// 보통 input 에서는 onInput 이 그런 이벤트를 발생하지만, react 에서는 onChange 이름이 보다 더 직관적이라고 판단하고 이벤트명을 그렇게 한 것이다.
