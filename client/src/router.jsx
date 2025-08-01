import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Landing from "./pages/lading";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/landing" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    );
}
