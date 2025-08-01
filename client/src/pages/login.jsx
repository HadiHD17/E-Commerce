import { AxiosError } from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "@/api";
import AuthLayoutHeader from "@/components/layouts/auth-layout/auth-layout-header";
import Button from "@/components/shared/button";
import ErrorAlert from "@/components/shared/error-alert";
import Input from "@/components/shared/input";
import Auth from "@/utils/auth";

export default function LoginPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError(null);
            setIsSubmitting(true);

            const { data } = await api.post("/guest/login", {
                email,
                password,
            });

            Auth.saveSession(data.payload);
            navigate("/");
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response.data.status);
                console.warn(err.response.data);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    if (Auth.isLoggedIn()) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <AuthLayoutHeader>Welcome Back</AuthLayoutHeader>
            <form className="auth-layout__form" onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Your password..."
                    withPasswordToggle
                    required
                />
                <p>
                    <Link to="/forgot-password">Forgot password?</Link>
                </p>

                <Button type="submit" variant="filled" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Log in"}
                </Button>

                <p className="text-center">
                    Don't Have An Account? <Link to="/register">Sign up</Link>
                </p>

                {error && <ErrorAlert message={error} />}
            </form>
        </>
    );
}
