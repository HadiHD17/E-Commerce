import { Navigate, Outlet, useLocation } from "react-router-dom";
import Auth from "@/utils/auth";
import cls from "@/utils/classnames";
import "./auth-layout.css";

export default function AuthLayout() {
    const { pathname } = useLocation();

    const isReversedLayout = pathname.startsWith("/forgot-password");

    if (Auth.isLoggedIn()) {
        return <Navigate to="/" replace />;
    }

    return (
        <main
            className={cls(
                "auth-layout",
                isReversedLayout && "auth-layout--reversed",
            )}
        >
            <div className="auth-layout__illustration">
                <div>
                    <img src="/logo-brand.svg" alt="" height={36} />
                </div>
                <p className="fs-h3">
                    Your one-stop shop for all modern electronics
                </p>
            </div>
            <section className="auth-layout__content">
                <div className="auth-layout__form-container">
                    <Outlet />
                </div>
            </section>
        </main>
    );
}
