import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    BellIcon,
    ShoppingCartSimpleIcon,
    UserIcon,
} from "@phosphor-icons/react";
import Button from "../button";
import "./navbar.css";
import NavbarSearch from "./navbar-search";

export default function Navbar({ isSignedIn, setIsSignedIn }) {
    const handleLogin = () => {
        // Add your login logic here
        setIsSignedIn(true);
    };

    const handleRegister = () => {
        // Add your register logic here
        setIsSignedIn(true);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="left">
                    <Link to="/" className="navbar__logo">
                        <img src="/logo-brand.svg" alt="Logo" height={30} />
                    </Link>
                </div>

                <NavbarSearch />

                <div className="right">
                    {isSignedIn ? (
                        <>
                            <button className="text-gray-700">
                                <BellIcon size={32} />
                            </button>
                            <Link to="/cart" className="text-gray-700">
                                <ShoppingCartSimpleIcon size={32} />
                            </Link>
                            <Link to="/profile" className="text-gray-700">
                                <UserIcon size={32} />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="filled"
                                color="brand"
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                            <Button
                                variant="faded"
                                color="gray"
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
