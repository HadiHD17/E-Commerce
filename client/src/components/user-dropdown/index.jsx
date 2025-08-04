import { useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@phosphor-icons/react";
import useAuth from "@/hooks/use-auth";
import "./user-dropdown.css";

export default function UserDropdown() {
    const { signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen(prev => !prev);
    }

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
                <div className="user-dropdown__menu border-subtle bg-gray-100 rounded-md shadow-lg">
                    <Link
                        to="/account"
                        onClick={() => setIsOpen(false)}
                        className="user-dropdown__menu-item fs-button"
                    >
                        Account Settings
                    </Link>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            signOut();
                        }}
                        className="fs-button text-danger-700"
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
}
