import { useState, useEffect } from "react";

export default function useDebounce(value, delayMs = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        let handle = setTimeout(() => setDebounced(value), delayMs);
        return () => {
            clearTimeout(handle);
        };
    }, [delayMs, value]);

    return debounced;
}
