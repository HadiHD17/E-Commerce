import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ShoppingCartSimpleIcon,
    UserIcon,
    ListIcon,
    XIcon,
    PackageIcon,
    GearIcon,
} from "@phosphor-icons/react";
import Button from "../button";
import NavbarSearch from "./navbar-search";
import cls from "@/utils/classnames";
import "./navbar.css";
import useAuth from "@/hooks/use-auth";
import UserDropdown from "@/components/user-dropdown";
import NotificationDropdown from "@/components/notification-dropdown";

const links = {
    customer: [
        { icon: UserIcon, text: "My Account", href: "/account" },
        { icon: PackageIcon, text: "My Orders", href: "/account/my-orders" },
    ],
    admin: [
        { icon: UserIcon, text: "My Account", href: "/account" },
        { icon: GearIcon, text: "Admin Dashboard", href: "/admin" },
    ],
};

export default function Navbar() {
    const { isLoggedIn, isAdmin, signOut } = useAuth();
    const navigate = useNavigate();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const userLinks = isAdmin ? links.admin : links.customer;

    const goToLogin = () => navigate("/login");
    const goToRegister = () => navigate("/register");
    const closeMobileNav = () => setIsMobileNavOpen(false);

    const authButtons = (
        <>
            <Button variant="filled" color="brand" onClick={goToRegister}>
                Register
            </Button>
            <Button variant="faded" color="gray" onClick={goToLogin}>
                Login
            </Button>
        </>
    );

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
                            
                            <Link to="/cart" className="text-gray-700">
                                <ShoppingCartSimpleIcon size={32} />
                            </Link>
                            <NotificationDropdown />
                            <UserDropdown />
                        </>
                    ) : (
                        <div className="d-flex items-center gap-4">
                            {authButtons}
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
                                to="/cart"
                                className="navbar__link d-inline-flex items-center gap-2"
                                onClick={closeMobileNav}
                            >
                                <ShoppingCartSimpleIcon size={24} />
                                Cart
                            </Link>
                            {userLinks.map(link => (
                                <Link
                                    key={link.text}
                                    to={link.href}
                                    className="navbar__link d-inline-flex items-center gap-2"
                                    onClick={closeMobileNav}
                                >
                                    <link.icon size={24} />
                                    {link.text}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    setIsMobileNavOpen();
                                    signOut();
                                }}
                                className="navbar__link self-start text-danger-700"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        authButtons
                    )}
                </div>
            </div>
        </nav>
    );
}
