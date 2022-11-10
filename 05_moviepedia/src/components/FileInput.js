import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, initialPreview, onChange }) {
    // const [value, setValue] = useState();
    const [preview, setPreview] = useState(initialPreview);

    const inputRef = useRef(); // ref 를 쓰면 실제 DOM 노드를 직접 참조할 수 있다. DOM 노드는 렌더링이 끝나야 존재한다는 점에 유의해야 한다.

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
        // if (inputRef.current) {
        //     console.log(inputRef.current);
        // }
        if (!value) return;

        // 이미지 미리보기를 위해서 Object URL 생성
        const nextPreview = URL.createObjectURL(value); // 이런걸 사이드 이펙트라고 한다.
        setPreview(nextPreview);

        // 메모리가 계속 잡히는 걸 방지하기 위한 사이드 이펙트를 제거하기 위해 revokeObjectURL 을 호출한다.
        // dependency 가 바뀌면 이 리턴 함수를 호출해서 먼저 메모리를 정리하고 createObjectURL 을 호출한다.
        return () => {
            setPreview(initialPreview);
            URL.revokeObjectURL(nextPreview);
        };
    }, [value, initialPreview]);

    // return <input type="file" value={value} onChange={handleChange}></input>; // 이렇게 하면 오류가 발생한다. 비제어 컴포넌트를 제어하려고 했다.
    // <input type="file" onChange={handleChange} ref={inputRef}></input>; // 반드시 file 컴포넌트는 비제어 컴포넌트로 해야 한다.
    return (
        <div>
            {preview && <img src={preview} alt="이미지 미리보기"></img>}
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleChange}
                ref={inputRef}
            ></input>
            {value && <button onClick={handleClearClick}>X</button>}
        </div>
    );
}

export default FileInput;
