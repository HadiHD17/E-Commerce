import { NavLink } from "react-router-dom";
import Button from "@/components/shared/button";
import "./admin-sidebar.css";
import { SignOutIcon } from "@phosphor-icons/react";

export default function AdminSidebar() {
    return (
        <div className="admin-sidebar">
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
                            <NavLink to="/admin/new-product">
                                New Product
                            </NavLink>
                        </li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/admin/orders">Orders</NavLink>
                </li>
            </ul>

            <Button
                variant="ghost"
                color="danger"
                className="admin-sidebar__logout "
            >
                <SignOutIcon /> Log out
            </Button>
        </div>
    );
}
