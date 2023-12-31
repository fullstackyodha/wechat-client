import { useEffect, useRef } from "react";

export function useChatScrollToBottom(prop) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            // IF ELEMENT HAS HEIGHT IT WILL HAVE scrollTop prop
            scrollRef.current.scrollTop =
                // Element height minus Client height
                scrollRef.current?.scrollHeight - scrollRef.current?.clientHeight;
        }
    }, [prop]);

    return scrollRef;
}
