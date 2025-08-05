import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayoutHeader from "@/components/layouts/auth-layout/auth-layout-header";
import Button from "@/components/shared/button";
import ErrorAlert from "@/components/shared/error-alert";
import Input from "@/components/shared/input";
// import { AxiosError } from "axios";

export default function ForgotPasswordPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [email, setEmail] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError(null);
            setIsSubmitting(true);
            // const { data } = await api.post("/guest/register", { email });
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response.data.status);
                console.warn(err.response.data);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <AuthLayoutHeader>Forgot Password?</AuthLayoutHeader>

            <p className="auth-layout__subtitle fs-body text-center">
                No worries! Enter your email address and we'll send you a reset
                link right away.
            </p>

            <form className="auth-layout__form" onSubmit={handleSubmit}>
                <Input
                    label="Email*"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                />

                <Button type="submit" variant="filled" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send reset link"}
                </Button>

                <p className="text-center">
                    Remembered your password?{" "}
                    <Link to="/login">Back to login</Link>
                </p>

                {error && <ErrorAlert error={error} />}
            </form>
        </>
    );
}
