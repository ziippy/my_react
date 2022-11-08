import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, onChange }) {
    const [preview, setPreview] = useState();
    const inputRef = useRef();

    const handleChange = (e) => {
        // console.log(e.target.files);
        const nextValue = e.target.files[0];
        // setValue(nextValue);
        onChange(name, nextValue);
    };

    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputNode) return;
        inputNode.value = "";
        onChange(name, null);
    };

    useEffect(() => {
        if (!value) return;

        // 이미지 미리보기를 위해서 Object URL 생성
        const nextPreview = URL.createObjectURL(value); // 이런걸 사이드 이펙트라고 한다.
        setPreview(nextPreview);

        // 메모리가 계속 잡히는 걸 방지하기 위한 사이드 이펙트를 제거하기 위해 revokeObjectURL 을 호출한다.
        // dependency 가 바뀌면 이 리턴 함수를 호출해서 먼저 메모리를 정리하고 createObjectURL 을 호출한다.
        return () => {
            setPreview();
            URL.revokeObjectURL(nextPreview);
        };
    }, [value]);

    return (
        <div>
            {preview && <img src={preview} alt="이미지 미리보기"></img>}
            <input type="file" onChange={handleChange} ref={inputRef}></input>
            {value && <button onClick={handleClearClick}>X</button>}
        </div>
    );
}

export default FileInput;
