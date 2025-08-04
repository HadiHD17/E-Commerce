import AdminSidebar from "@/components/layouts/admin-layout/sidebar";
import { Outlet } from "react-router-dom";
import "./admin-layout.css";

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-layout__main">
                <Outlet />
            </main>
        </div>
    );
}
