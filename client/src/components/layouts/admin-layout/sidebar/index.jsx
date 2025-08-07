import { useDispatch } from "react-redux";
import {
    GaugeIcon,
    PackageIcon,
    PlusIcon,
    SignOutIcon,
    SquaresFourIcon,
} from "@phosphor-icons/react";
import Button from "@/components/shared/button";
import { logout } from "@/store/slices/auth-slice";
import AdminSidebarLink from "./admin-sidebar-link";
import "./admin-sidebar.css";

export default function AdminSidebar() {
    const dispatch = useDispatch();

    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar-links">
                <AdminSidebarLink icon={GaugeIcon} to="/admin/dashboard">
                    Dashboard
                </AdminSidebarLink>

                <div className="has-submenu">
                    <p>Products</p>

                    <ul className="submenu">
                        <li>
                            <AdminSidebarLink
                                icon={SquaresFourIcon}
                                to="/admin/all-products"
                            >
                                All Products
                            </AdminSidebarLink>
                        </li>
                        <li>
                            <AdminSidebarLink
                                icon={PlusIcon}
                                to="/admin/new-product"
                            >
                                New Product
                            </AdminSidebarLink>
                        </li>
                    </ul>
                </div>

                <AdminSidebarLink icon={PackageIcon} to="/admin/orders">
                    Orders
                </AdminSidebarLink>
            </div>

            <Button
                variant="outlined"
                color="danger"
                className="admin-sidebar__logout justify-center"
                onClick={() => dispatch(logout())}
            >
                <SignOutIcon size={24} /> Log out
            </Button>
        </div>
    );
}
