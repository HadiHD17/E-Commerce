import { useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@phosphor-icons/react";
import useAuth from "@/hooks/use-auth";
import "./user-dropdown.css";

const links = {
    customer: [
        { text: "My Account", href: "/account" },
        { text: "My Orders", href: "/account/my-orders" },
    ],
    admin: [
        { text: "My Account", href: "/account" },
        { text: "Admin Dashboard", href: "/admin" },
    ],
};

export default function UserDropdown() {
    const { isAdmin, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const userLinks = isAdmin ? links.admin : links.customer;

    const handleClick = () => setIsOpen(prev => !prev);
    const closeDropdown = () => setIsOpen(false);

    const handleLogout = () => {
        setIsOpen(false);
        signOut();
    };

    return (
        <div className="user-dropdown">
            <button
                type="button"
                className="text-gray-700"
                onClick={handleClick}
            >
                <UserIcon size={32} />
            </button>
            {isOpen && (
                <div className="user-dropdown__menu border-subtle bg-white rounded-md shadow-lg">
                    {userLinks.map(({ text, href }) => (
                        <Link
                            key={text}
                            to={href}
                            onClick={closeDropdown}
                            className="user-dropdown__menu-item fs-button"
                        >
                            {text}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="fs-button text-danger-700"
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
}
