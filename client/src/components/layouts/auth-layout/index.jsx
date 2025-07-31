import { Outlet } from "react-router-dom";
import "./styles.css";

export default function AuthLayout() {
    return (
        <main className="auth-layout">
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
