import { NavLink } from "react-router-dom";
import "./admin-sidebar.css";
import Button from "@/components/shared/button";

export default function AdminSidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <NavLink to="/admin">Dashboard</NavLink>
                </li>

                <li className="has-submenu">
                    <span>Products</span>
                    <ul className="submenu">
                        <li>
                            <NavLink to="/admin/all-products">
                                All Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/new-products">
                                New Product
                            </NavLink>
                        </li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/admin/orders">Orders</NavLink>
                </li>
            </ul>

            <Button className="logout">Log out</Button>
        </div>
    );
}
