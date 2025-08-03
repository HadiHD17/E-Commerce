import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgot-password";
import ProductsSearchPage from "@/pages/products-search";
import ProductDetailsPage from "@/pages/view-product";
import AccountMyOrdersPage from "@/pages/account/my-orders";
import AdminOrdersPage from "@/pages/admin/orders";
import AdminProductsPage from "@/pages/admin/products";
import NotFoundPage from "@/pages/not-found";
import AuthLayout from "@/components/layouts/auth-layout";
import RootLayout from "@/components/layouts/root-layout";
import AccountLayout from "@/components/layouts/account-layout";
import AccountSettingsPage from "@/pages/account/settings";
import ChatPage from "@/pages/chat";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/search" element={<ProductsSearchPage />} />
                    <Route
                        path="/ai-search"
                        element={<Navigate to="/chat" replace />}
                    />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />

                    <Route
                        path="/products/:id"
                        element={<ProductDetailsPage />}
                    />

                    <Route>
                        <Route
                            path="/admin/orders"
                            element={<AdminOrdersPage />}
                        />
                        <Route
                            path="/admin/products"
                            element={<AdminProductsPage />}
                        />
                    </Route>

                    <Route path="/account" element={<AccountLayout />}>
                        <Route index element={<Navigate to="settings" />} />
                        <Route
                            path="/account/settings"
                            element={<AccountSettingsPage />}
                        />
                        <Route
                            path="/account/my-orders"
                            element={<AccountMyOrdersPage />}
                        />
                        <Route
                            path="/account/orders"
                            element={<Navigate to="/account/my-orders" />}
                        />
                    </Route>

                    <Route element={<AuthLayout />}>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route
                            path="forgot-password"
                            element={<ForgotPasswordPage />}
                        />
                    </Route>

                    {/* Add other routes here */}

                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
