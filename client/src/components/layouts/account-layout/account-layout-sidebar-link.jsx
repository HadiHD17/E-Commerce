import { NavLink } from "react-router-dom";
import cls from "@/utils/classnames";

export default function AccountLayoutSidebarLink({ to, icon, children }) {
    const IconComponent = icon;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cls(
                    "account-layout-sidebar-link fs-button",
                    isActive && "account-layout-sidebar-link--active",
                )
            }
        >
            {({ isActive }) => (
                <>
                    <IconComponent
                        className="flex-shrink-0 text-gray-500"
                        weight={isActive ? "bold" : "regular"}
                        size={24}
                    />
                    {children}
                </>
            )}
        </NavLink>
    );
}
