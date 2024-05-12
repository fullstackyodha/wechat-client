import { BrowserRouter } from "react-router-dom";
import React from "react";

import "@/App.scss";
import AppRouter from "@/routes";

function App() {
    return (
        <>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </>
    );
}

export default App;
