// 커스텀 Hook 은 리액트 이름의 규칙을 따라야 한다.
// use 이름으로 시작한다.

import { useCallback, useState } from "react";

function useAsync(asyncFunction) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    const wrappedFunction = useCallback(
        async (...args) => {
            try {
                setPending(true);
                setError(null);
                return await asyncFunction(...args);
            } catch (error) {
                setError(error);
                return;
            } finally {
                setPending(false);
            }
        },
        [asyncFunction]
    );

    return [pending, error, wrappedFunction];
}

export default useAsync;
