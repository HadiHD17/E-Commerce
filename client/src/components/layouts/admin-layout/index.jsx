import AdminSidebar from "@/components/layouts/admin-layout/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import "./admin-layout.css";
import useAuth from "@/hooks/use-auth";
import Navbar from "@/components/shared/navbar";

export default function AdminLayout() {
    const { isAdmin, isLoading } = useAuth();

    if (!isLoading && !isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="admin-layout">
            <Navbar />
            <div className="admin-layout__body">
                <AdminSidebar />
                <div className="admin-layout__outlet">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
