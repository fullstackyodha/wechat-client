import React, { useCallback, useEffect, useRef, useState } from "react";
import "@/components/toast/Toast.scss";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { clearNotification } from "@/redux_toolkit/reducers/notifications/notifications.reducers";
import { useDispatch } from "react-redux";

function Toast(props) {
    const { toastList, position, autoDelete, autoDeleteTime = 2000 } = props;

    const dispatch = useDispatch();

    const [toasts, setToasts] = useState(toastList);
    const toastData = useRef([]);

    useEffect(() => {
        setToasts([...toastList]);
    }, [toastList]);

    const deleteToast = useCallback(() => {
        // clone the toast in the state to the reference object
        toastData.current = cloneDeep(toasts);
        toastData.current.splice(0, 1);

        setToasts([...toastData.current]);

        if (!toastData.current.length) {
            toasts.length = 0;

            // disaptch notification
            clearNotification(dispatch);
        }
    }, [toasts, dispatch]);

    useEffect(() => {
        const tick = () => {
            deleteToast();
        };

        if (autoDelete && toastList && toasts) {
            const interval = setInterval(tick, autoDeleteTime);

            return () => {
                clearInterval(interval);
            };
        }
    }, [toasts, autoDelete, toastData, autoDeleteTime, deleteToast]);

    return (
        <div className={`toast-notification-container ${position}`}>
            {toasts?.map((toast, index) => (
                <div
                    data-testid="toast-notification"
                    className="toast-notification"
                    style={{
                        backgroundColor: toast.backgroundColor
                    }}
                    key={index}
                >
                    <button className="cancel-button" onClick={deleteToast}>
                        x
                    </button>

                    <div
                        className={`toast-notification-image ${toast.description.length <= 73 ? "toast-icon" : ""}`}
                    >
                        <img src={toast.icon} alt="" />
                    </div>

                    <div
                        className={`toast-notification-message ${toast.description.length <= 73 ? "toast-message" : ""}`}
                    >
                        {toast.description}
                    </div>
                </div>
            ))}
        </div>
    );
}

Toast.PropTypes = {
    toastList: PropTypes.array,
    position: PropTypes.string,
    autoDelete: PropTypes.bool,
    autoDeleteTime: PropTypes.number
};

export default Toast;
