import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgot-password";
import ProductsSearchPage from "@/pages/products-search";
import ProductDetails from "@/pages/view-product";
import AuthLayout from "@/components/layouts/auth-layout";
import RootLayout from "@/components/layouts/root-layout";
import AdminOrders from "./pages/admin-orders";
import AdminAllProducts from "./pages/admin-all-products";
import NotFound from "./pages/error";
import MyOrders from "./pages/account-my-orders";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/search" element={<ProductsSearchPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route
                        path="/products-search"
                        element={<ProductsSearchPage />}
                    />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="/my-orders" element={<MyOrders />} />

                    <Route path="/admin/orders" element={<AdminOrders />} />
                    <Route
                        path="/admin/all-products"
                        element={<AdminAllProducts />}
                    />
                    {/* Add other routes here */}

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
