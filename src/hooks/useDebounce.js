import { useEffect, useState } from "react";

// SETS DELAY IF YOU TYPE IN INPUT AS IT CAN MAKE TOO MANY API CALLS
export function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        // Schedules execution of a one-time callback after delay milliseconds.
        const timer = setTimeout(() => setDebounceValue(value), delay || 500);

        return () => {
            // Cancels a Timeout object created by setTimeout()
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debounceValue;
}
