import { BrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";

import "@/App.scss";
import AppRouter from "@/routes";
import { socketService } from "@services/socket/socket.service";
import Toast from "@components/toast/Toast";
import { useSelector } from "react-redux";

function App() {
    const { notifications } = useSelector((state) => state);

    useEffect(() => {
        socketService.setUpSocketConnection();
    }, []);

    return (
        <>
            {notifications && notifications.length > 0 && (
                <Toast position="top-right" toastList={notifications} autoDelete={true} />
            )}
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </>
    );
}

export default App;
