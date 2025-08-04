import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BellIcon,
    ShoppingCartSimpleIcon,
    UserIcon,
    ListIcon,
    XIcon,
} from "@phosphor-icons/react";
import Button from "../button";
import NavbarSearch from "./navbar-search";
import cls from "@/utils/classnames";
import "./navbar.css";
import useAuth from "@/hooks/use-auth";
import UserDropdown from "@/components/user-dropdown";

export default function Navbar() {
    const { isLoggedIn, signOut } = useAuth();
    const navigate = useNavigate();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const goToLogin = () => navigate("/login");
    const goToRegister = () => navigate("/register");

    return (
        <nav className="navbar">
            <div className="container">
                <div className="left">
                    <Link to="/" className="navbar__logo">
                        <img src="/logo-brand.svg" alt="Logo" height={28} />
                    </Link>
                </div>

                <div className="navbar__desktop-search">
                    <NavbarSearch />
                </div>

                <div className="d-flex items-center gap-6">
                    <button className="navbar__mobile-toggle">
                        <BellIcon size={32} />
                    </button>
                    <button
                        className="navbar__mobile-toggle"
                        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                    >
                        {isMobileNavOpen ? (
                            <XIcon size={32} />
                        ) : (
                            <ListIcon size={32} />
                        )}
                    </button>
                </div>

                <div className="right">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/account/my-orders"
                                className="navbar__link"
                            >
                                My Orders
                            </Link>
                            <button className="text-gray-700">
                                <BellIcon size={32} />
                            </button>
                            <Link to="/cart" className="text-gray-700">
                                <ShoppingCartSimpleIcon size={32} />
                            </Link>
                            <UserDropdown />
                        </>
                    ) : (
                        <div className="d-flex items-center gap-4">
                            <Button
                                variant="filled"
                                color="brand"
                                onClick={goToRegister}
                            >
                                Register
                            </Button>
                            <Button
                                variant="faded"
                                color="gray"
                                onClick={goToLogin}
                            >
                                Login
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div
                className={cls(
                    "navbar__mobile",
                    isMobileNavOpen && "navbar__mobile--open",
                )}
            >
                <div className="navbar__mobile-search">
                    <NavbarSearch />
                </div>

                <div className="d-flex flex-col gap-y-6">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/account/my-orders"
                                className="navbar__link"
                                onClick={() => setIsMobileNavOpen(false)}
                            >
                                My Orders
                            </Link>
                            <Link
                                to="/cart"
                                className="navbar__link d-inline-flex items-center gap-2"
                                onClick={() => setIsMobileNavOpen(false)}
                            >
                                <ShoppingCartSimpleIcon size={24} />
                                Cart
                            </Link>
                            <Link
                                to="/account"
                                className="navbar__link d-inline-flex items-center gap-2"
                                onClick={() => setIsMobileNavOpen(false)}
                            >
                                <UserIcon size={24} />
                                My Account
                            </Link>
                            <button
                                onClick={() => {
                                    setIsMobileNavOpen();
                                    signOut();
                                }}
                                className="navbar__link self-start"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="filled"
                                color="brand"
                                onClick={goToRegister}
                            >
                                Register
                            </Button>
                            <Button
                                variant="faded"
                                color="gray"
                                onClick={goToLogin}
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
