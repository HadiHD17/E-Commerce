import { Outlet, useLocation } from "react-router-dom";
import AccountLayoutSidebar from "./account-layout-sidebar";
import "./account-layout.css";

export default function AccountLayout() {
    return (
        <div className="account-layout container">
            <AccountLayoutSidebar />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}
