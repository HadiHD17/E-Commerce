import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import cls from "@/utils/classnames";
import useAuth from "@/hooks/use-auth";
import "./auth-layout.css";

export default function AuthLayout() {
    const { isLoggedIn, isLoading } = useAuth();
    const { pathname } = useLocation();

    if (!isLoading && isLoggedIn) {
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
                <img src="/auth-layout-illustration.jpg" alt="" />
            </div>
            <section className="auth-layout__content">
                <div className="auth-layout__form-container">
                    <Link to="/">
                        <img src="/logo-black.svg" alt="" height={32} />
                    </Link>

                    <Outlet />
                </div>
            </section>
        </main>
    );
}
