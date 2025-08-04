import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./admin-sidebar.css";

export default function AdminSidebar() {
    const location = useLocation();

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link
                        to="/admin/dashboard"
                        className={
                            location.pathname.includes("dashboard")
                                ? "active"
                                : ""
                        }
                    >
                        Dashboard
                    </Link>
                </li>

                <li className="has-submenu">
                    <span
                        className={
                            location.pathname.includes("/admin/products")
                                ? "active"
                                : ""
                        }
                    >
                        Products
                    </span>
                    <ul className="submenu">
                        <li>
                            <Link
                                to="/admin/all-products"
                                className={
                                    location.pathname === "/admin/all-products"
                                        ? "active"
                                        : ""
                                }
                            >
                                All Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/new-products"
                                className={
                                    location.pathname === "/admin/new-products"
                                        ? "active"
                                        : ""
                                }
                            >
                                New Product
                            </Link>
                        </li>
                    </ul>
                </li>

                <li>
                    <Link
                        to="/admin/orders"
                        className={
                            location.pathname.includes("orders") ? "active" : ""
                        }
                    >
                        Orders
                    </Link>
                </li>
            </ul>

            <button className="logout">Log out</button>
        </div>
    );
}
