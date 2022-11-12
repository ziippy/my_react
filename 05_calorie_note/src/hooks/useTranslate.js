import { useLocale } from "../context/LocaleContext";

const dict = {
    ko: {
        "confirm button": "확인",
        "cancel button": "취소",
        "edit button": "수정",
        "delete button": "삭제",
    },
    en: {
        "confirm button": "OK",
        "cancel button": "Cancel",
        "edit button": "Edit",
        "delete button": "Delete",
    },
};

function useTranslate() {
    const locale = useLocale();

    const translate = (key) => dict[locale][key] || "";

    return translate;
}

export default useTranslate;
