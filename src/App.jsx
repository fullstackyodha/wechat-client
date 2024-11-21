import { BrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";

import "@/App.scss";
import AppRouter from "@/routes";
import { socketService } from "./services/socket/socket.service";

function App() {
    useEffect(() => {
        socketService.setUpSocketConnection();
    }, []);

    return (
        <>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </>
    );
}

export default App;
