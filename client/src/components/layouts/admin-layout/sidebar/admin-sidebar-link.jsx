import { NavLink } from "react-router-dom";

export default function AdminSidebarLink({ icon, to, children }) {
    const IconComponent = icon;

    return (
        <NavLink to={to} className="admin-sidebar-link">
            {({ isActive }) => (
                <>
                    <IconComponent
                        size={24}
                        weight={isActive ? "bold" : "regular"}
                    />
                    {children}
                </>
            )}
        </NavLink>
    );
}
