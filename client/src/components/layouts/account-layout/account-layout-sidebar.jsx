import { ClockCounterClockwiseIcon, SlidersIcon } from "@phosphor-icons/react";
import AccountLayoutSidebarLink from "./account-layout-sidebar-link";

export default function AccountLayoutSidebar() {
    return (
        <div className="account-layout-sidebar rounded-md">
            <AccountLayoutSidebarLink to="/account/settings" icon={SlidersIcon}>
                Account Settings
            </AccountLayoutSidebarLink>
            <AccountLayoutSidebarLink
                to="/account/my-orders"
                icon={ClockCounterClockwiseIcon}
            >
                My Orders
            </AccountLayoutSidebarLink>
        </div>
    );
}
