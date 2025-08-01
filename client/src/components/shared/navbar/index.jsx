import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartSimpleIcon, UserIcon } from "@phosphor-icons/react";
import Button from "../button";
import Input from "../input";
import "./navbar.css";

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
                <button type="submit" variant="filled" color="brand">
                    Search
                </button>
            </form>

            <div className="right">
                {isSignedIn ? (
                    <>
                        <Button
                            variant="filled"
                            color="brand"
                            onClick={() => navigate("/cart")}
                        >
                            <ShoppingCartSimpleIcon size={20} />
                        </Button>
                        <Button
                            variant="filled"
                            color="brand"
                            onClick={() => navigate("/profile")}
                        >
                            <UserIcon size={20} />
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="filled"
                            color="brand"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        <Button
                            variant="filled"
                            color="brand"
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
}
