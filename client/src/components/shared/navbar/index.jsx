import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button";
import Input from "../input";
import { ShoppingCart, User } from "lucide-react"; // react-lucide icons
import "./navbar.css"; // Assuming you have a CSS file for styling

export default function Navbar() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // Add your login logic here
        setIsSignedIn(true);
    };

    const handleRegister = () => {
        // Add your register logic here
        setIsSignedIn(true);
    };

    const handleSearch = e => {
        e.preventDefault();
        // Add your search logic here
        // Example: navigate(`/search?query=${search}`);
    };

    return (
        <nav className="navbar">
            <div className="left">
                <img src="/logo.png" alt="Logo" />
                <span>MyStore</span>
            </div>

            <form onSubmit={handleSearch}>
                <Input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search products..."
                    aria-label="Search products"
                />
                <Button
                    type="submit"
                    variant="filled"
                    color="brand"
                    children="Search"
                />
            </form>

            <div className="right">
                {!isSignedIn ? (
                    <>
                        <Button
                            variant="filled"
                            color="brand"
                            onClick={handleLogin}
                            children="Login"
                        />
                        <Button
                            variant="filled"
                            color="brand"
                            onClick={handleRegister}
                            children="Register"
                        />
                    </>
                ) : (
                    <>
                        <Button
                            variant="filled"
                            color="brand"
                            onClick={() => navigate("/cart")}
                        >
                            <ShoppingCart size={20} />
                        </Button>
                        <Button
                            variant="filled"
                            color="brand"
                            onClick={() => navigate("/profile")}
                        >
                            <User size={20} />
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
}
