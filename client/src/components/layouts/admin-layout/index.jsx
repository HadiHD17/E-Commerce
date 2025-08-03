import AdminSidebar from "@/components/admin-sidebar";
import { Outlet } from "react-router-dom";
import "./admin-layout.css";

export default function AdminLayout() {
    return (
        <div className="admin-layout flex-1 d-flex">
            <AdminSidebar />
            <main className="admin-layout__main">
                <Outlet />
            </main>
        </div>
    );
}
