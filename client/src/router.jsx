import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgot-password";
import AuthLayout from "@/components/layouts/auth-layout";
import Landing from "./pages/landing";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route
                        path="forgot-password"
                        element={<ForgotPasswordPage />}
                    />
                </Route>

                <Route path="/landing" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    );
}
