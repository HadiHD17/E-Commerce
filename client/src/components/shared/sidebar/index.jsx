import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/admin/products">Products</Link>
                </li>
                <li>
                    <Link to="/admin/orders" className="active">
                        Orders
                    </Link>
                </li>
            </ul>
            <button className="logout">Log out</button>
        </div>
    );
}
