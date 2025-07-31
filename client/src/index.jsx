import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./store";
import { Provider as StoreProvider } from "react-redux";
import Router from "./router.jsx";

import "./styles/index.css"; // keep this as the last import

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <StoreProvider store={store}>
            <Router />
        </StoreProvider>
    </StrictMode>,
);
