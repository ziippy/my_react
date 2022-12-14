import { useState } from "react";
import useTranslate from "../hooks/useTranslate";
import FoodForm from "./FoodForm";
import "./FoodList.css";

function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
    const t = useTranslate();
    const { imgUrl, title, calorie, content, createdAt } = item;

    const handleDeleteClick = () => onDelete(item.id);

    const handleEditClick = () => onEdit(item.id);

    return (
        <div className="FoodListItem">
            <img className="FoodListItem-img" src={imgUrl} alt={title} />
            <div>{title}</div>
            <div>{calorie}</div>
            <div>{content}</div>
            <div>{formatDate(createdAt)}</div>
            <button onClick={handleEditClick}>{t("edit button")}</button>
            <button onClick={handleDeleteClick}>{t("delete button")}</button>
        </div>
    );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
    const [editingId, setEditingId] = useState(null);
    const handleCancel = () => setEditingId(null);

    return (
        <ul className="FoodList">
            {items.map((item) => {
                if (item.id === editingId) {
                    const { id, imgUrl, title, calorie, content } = item;
                    const initialValues = {
                        id,
                        imgUrl,
                        title,
                        calorie,
                        content,
                    };

                    const handleSubmit = (formData) => {
                        onUpdate(id, formData);
                    };
                    const handleSubmitSuccess = (food) => {
                        onUpdateSuccess(food);
                        setEditingId(null);
                    };
                    return (
                        <li key={item.id}>
                            <FoodForm
                                initialValues={initialValues}
                                initialPreview={imgUrl}
                                onCancel={handleCancel}
                                onSubmit={handleSubmit}
                                onSubmitSuccess={handleSubmitSuccess}
                            />
                        </li>
                    );
                }

                return (
                    <li key={item.id}>
                        <FoodListItem
                            item={item}
                            onDelete={onDelete}
                            onEdit={setEditingId}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export default FoodList;
