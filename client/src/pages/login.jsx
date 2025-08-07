import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/api";
import AuthLayoutHeader from "@/components/layouts/auth-layout/auth-layout-header";
import Button from "@/components/shared/button";
import ErrorAlert from "@/components/shared/error-alert";
import Input from "@/components/shared/input";
import useAuth from "@/hooks/use-auth";

export default function LoginPage() {
    const navigate = useNavigate();
    const { signIn } = useAuth();

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

            signIn(data.payload);
            navigate("/");
        } catch (err) {
            if (err instanceof AxiosError) {
                console.warn(err.response.data);
                if (
                    "status" in err.response.data ||
                    "errors" in err.response.data
                ) {
                    setError(err.response.data);
                } else {
                    setError("An unknown error occurred");
                }
            }
        } finally {
            setIsSubmitting(false);
        }
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
                    error={error?.errors?.email}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Your password..."
                    error={error?.errors?.password}
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

                {error && <ErrorAlert error={error} />}
            </form>
        </>
    );
}
