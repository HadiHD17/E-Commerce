import AdminSidebar from "@/components/layouts/admin-layout/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import "./admin-layout.css";
import useAuth from "@/hooks/use-auth";

export default function AdminLayout() {
    const { isAdmin, isLoading } = useAuth();

    if (!isLoading && !isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-layout__main">
                <Outlet />
            </main>
        </div>
    );
}
