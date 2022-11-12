import { useState } from "react";
import useTranslate from "../hooks/useTranslate";
import Rating from "./Rating";
import ReviewForm from "./ReviewForm";
import "./ReviewList.css";

function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
    const t = useTranslate();

    const handleDeleteClick = () => onDelete(item.id);
    const handleEditClick = () => onEdit(item.id);

    return (
        <div className="ReviewListItem">
            <img
                className="ReviewListItem-img"
                src={item.imgUrl}
                alt={item.title}
            />
            <div>
                <h1>{item.title}</h1>
                <Rating value={item.rating}></Rating>
                <p>{formatDate(item.createdAt)}</p>
                <p>{item.content}</p>
                <button onClick={handleEditClick}>{t("edit button")}</button>
                <button onClick={handleDeleteClick}>
                    {t("delete button")}
                </button>
            </div>
        </div>
    );
}

function ReviewList({ items, onDelete, onUpdate, onUpdateSuccess }) {
    // console.log(items);
    const [editingId, setEditingId] = useState(null);

    const handleCancel = () => setEditingId(null);

    return (
        <ul>
            {items.map((item) => {
                // return <li>{item.title}</li>;
                if (item.id === editingId) {
                    const { id, imgUrl, title, rating, content } = item;
                    const initialValues = {
                        id,
                        imgUrl,
                        title,
                        rating,
                        content,
                    };

                    const handleSubmit = (formData) => {
                        console.log("formData", formData);
                        onUpdate(id, formData);
                    };
                    const handleSubmitSuccess = (review) => {
                        onUpdateSuccess(review);
                        setEditingId(null);
                    };
                    return (
                        <li key={item.id}>
                            <ReviewForm
                                initialValues={initialValues}
                                initialPreview={imgUrl}
                                onCancel={handleCancel}
                                onSubmit={handleSubmit}
                                onSubmitSuccess={handleSubmitSuccess}
                            />
                        </li>
                    );
                } else {
                    return (
                        <li key={item.id}>
                            <ReviewListItem
                                item={item}
                                onDelete={onDelete}
                                onEdit={setEditingId}
                            />
                        </li>
                    );
                }
            })}
        </ul>
    );
}

export default ReviewList;
