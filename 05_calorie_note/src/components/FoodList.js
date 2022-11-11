import { useContext, useState } from "react";
import LocaleContext from "../context/LocaleContext";
import FoodForm from "./FoodForm";
import "./FoodList.css";

function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
    const locale = useContext(LocaleContext);
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
            <p>현재 언어: {locale}</p>
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleDeleteClick}>삭제</button>
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
