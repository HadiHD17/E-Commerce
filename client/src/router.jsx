import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "@/pages/cart";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgot-password";
import AuthLayout from "@/components/layouts/auth-layout";
import RootLayout from "@/components/layouts/root-layout";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />

                    <Route element={<AuthLayout />}>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route
                            path="forgot-password"
                            element={<ForgotPasswordPage />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
