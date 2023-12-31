import { useEffect, useRef } from "react";

export function useEffectOnce(callback) {
    const calledOnce = useRef(false);

    useEffect(() => {
        if (!calledOnce.current) {
            callback();
            calledOnce.current = true;
        }
    }, [callback]);
}
