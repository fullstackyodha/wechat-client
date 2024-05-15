import Suggestions from "@/components/suggestions/Suggestions";
import "@/pages/social/streams/Streams.scss";
import { useRef } from "react";

function Streams() {
    const bodyRef = useRef(null);
    const bottomLineRef = useRef();

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
