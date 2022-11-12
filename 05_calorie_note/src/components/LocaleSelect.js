import { useLocale, useSetLocale } from "../context/LocaleContext";

function LocaleSelect() {
    const locale = useLocale();
    const setLocale = useSetLocale();

    const handleChange = (e) => {
        setLocale(e.target.value);
    };

    return (
        <select value={locale} onChange={handleChange}>
            <option value="ko">Korean</option>
            <option value="en">English</option>
        </select>
    );
}

export default LocaleSelect;
