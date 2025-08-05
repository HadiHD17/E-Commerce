import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthLayoutHeader from "@/components/layouts/auth-layout/auth-layout-header";
import Button from "@/components/shared/button";
import ErrorAlert from "@/components/shared/error-alert";
import Input from "@/components/shared/input";

export default function ForgotPasswordPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError(null);
            setIsSubmitting(true);

            const response = await axios.post("http://localhost:8000/api/v0.1/guest/forgot_password", {
                email,
            });

            console.log("Reset link sent:", response.data.payload);
            setEmail("Email sent!")
        } catch (err) {
            if (err.response) {
                setError(err.response.data?.status || "Something went wrong.");
                console.warn(err.response.data);
            } else {
                setError("Network error or server not responding.");
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