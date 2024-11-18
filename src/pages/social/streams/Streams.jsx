import Suggestions from "@/components/suggestions/Suggestions";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import "@/pages/social/streams/Streams.scss";
import { getUserSuggestions } from "@/redux_toolkit/api/suggestions";
import { useRef } from "react";
import { useDispatch } from "react-redux";

function Streams() {
    const bodyRef = useRef(null);
    const bottomLineRef = useRef();

    const dispatch = useDispatch();

    // ONLY CALLS ONCE AFTER LOADING
    useEffectOnce(() => {
        dispatch(getUserSuggestions());
    });

    return (
        <div className="streams" data-testid="streams">
            <div className="streams-content">
                {/* POSTS */}
                <div className="streams-post" ref={bodyRef}>
                    <div>Form</div>

                    <div>Items</div>

                    <div
                        ref={bottomLineRef}
                        style={{ marginBottom: "50px", height: "50px" }}
                    ></div>
                </div>

                {/* USER SUGGESTIONS */}
                <div className="streams-suggestions">
                    <Suggestions />
                </div>
            </div>
        </div>
    );
}

export default Streams;
