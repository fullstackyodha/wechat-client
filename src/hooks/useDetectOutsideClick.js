import { useEffect, useRef, useState } from "react";

export function useDetectOutsideClick(ref, initialState) {
    const [isActive, setIsActive] = useState(initialState);

    useEffect(() => {
        const onClick = (event) => {
            if (ref.current !== null && !ref.current.contains(event.target)) {
                setIsActive((isActive) => !isActive);
            }
        };

        if (isActive) {
            window.addEventListener("mousedown", onClick);
        }

        return () => {
            window.removeEventListener("mousedown", onClick);
        };
    }, [isActive, ref]);

    return { isActive, setIsActive };
}
