import { useCallback, useEffect } from "react";

export function useInfiniteScroll(bodyRef, bottomLineRef, callback) {
    // Returns a memoized version of the callback
    // that only changes if one of the inputs has changed.
    const handleScroll = useCallback(() => {
        const containerHeight = bodyRef?.current?.getBoundingClientRect().height;
        const { top: bottomLineTop } = bottomLineRef?.current?.getBoundingClientRect();

        if (bottomLineTop <= containerHeight) {
            callback();
        }
    }, [bodyRef, bottomLineRef, callback]);

    useEffect(() => {
        const bodyRefCurrent = bodyRef?.current;

        bodyRefCurrent?.addEventListener("scroll", handleScroll, true);

        return () => bodyRefCurrent.removeEventListener("scroll", handleScroll, true);
    }, [bodyRef, handleScroll]);
}
