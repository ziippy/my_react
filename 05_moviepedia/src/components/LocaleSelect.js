function LocaleSelect({ value, onChange }) {
    const handleChange = (e) => {
        onChange(e.target.value);
    };
    return (
        <select value={value} onChange={handleChange}>
            <option value="ko">Korean</option>
            <option value="en">English</option>
        </select>
    );
}

export default LocaleSelect;
