import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "@/components/shared/input";
import Button from "@/components/shared/button";
import AuthLayoutHeader from "@/components/layouts/auth-layout/auth-layout-header";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        alert("submitted");
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

                <Button type="submit" variant="filled">
                    Log in
                </Button>

                <p className="text-center">
                    Don't Have An Account? <Link to="/register">Sign up</Link>
                </p>
            </form>
        </>
    );
}
