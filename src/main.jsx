import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "@/App";
import "@/index.scss";
<<<<<<< HEAD
import { store } from "@redux/store";
=======
import { store } from "@/redux_toolkit/store";
>>>>>>> d89626536129658d27f527b0535230e984af8f01

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
