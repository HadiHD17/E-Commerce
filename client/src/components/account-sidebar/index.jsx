import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./account-sidebar.css";

export default function AccountSidebar() {
    const location = useLocation(); // lowercase 'location'
    return (
        <aside className="sidebar">
            <ul className="sidebar-links">
                <li>
                    <Link
                        to="/account-settings"
                        className={
                            location.pathname === "/account-settings"
                                ? "active"
                                : ""
                        }
                    >
                        Account Settings
                    </Link>
                </li>
                <li>
                    <Link
                        to="/my-orders"
                        className={
                            location.pathname === "/my-orders" ? "active" : ""
                        }
                    >
                        My Orders
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
