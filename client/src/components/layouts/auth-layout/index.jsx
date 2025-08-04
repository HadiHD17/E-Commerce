import { Navigate, Outlet, useLocation } from "react-router-dom";
import cls from "@/utils/classnames";
import "./auth-layout.css";
import useAuth from "@/hooks/use-auth";

export default function AuthLayout() {
    const { isLoggedIn } = useAuth();
    const { pathname } = useLocation();

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    const isReversedLayout = pathname.startsWith("/forgot-password");

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
