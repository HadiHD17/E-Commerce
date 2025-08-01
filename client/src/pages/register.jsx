import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/components/shared/input";
import Button from "@/components/shared/button";
import Auth from "@/utils/auth";
import api from "@/api";
import AuthLayoutHeader from "@/components/layouts/auth-layout/auth-layout-header";
import ErrorAlert from "@/components/shared/error-alert";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (confirmPassword !== password) {
            return setError("Password and Confirm Password fields must match");
        }

        try {
            setError(null);
            setIsSubmitting(true);

            const { data } = await api.post("/guest/register", {
                name: fullName,
                email,
                phone: phoneNumber,
                password,
            });

            Auth.saveSession(data.payload);
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
            <AuthLayoutHeader>Create Your Account</AuthLayoutHeader>
            <form className="auth-layout__form" onSubmit={handleSubmit}>
                <Input
                    label="Full Name*"
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="John Doe"
                    error={error?.errors?.name}
                    required
                />
                <Input
                    label="Email*"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    error={error?.errors?.email}
                    required
                />
                <Input
                    label="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    error={error?.errors?.phone}
                    placeholder="+1 23456789"
                />
                <Input
                    label="Password*"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Your password..."
                    withPasswordToggle
                    error={error?.errors?.password}
                    required
                />
                <Input
                    label="Confirm Password*"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password..."
                    withPasswordToggle
                    required
                />
                <Button type="submit" variant="filled" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                </Button>

                <p className="text-center">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>

                {error && <ErrorAlert error={error} />}
            </form>
        </>
    );
}
