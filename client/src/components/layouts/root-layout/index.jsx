import Navbar from "@/components/shared/navbar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./root-layout.css";

const NO_NAVBAR_PAGES = ["/login", "/register", "/forgot-password"];

export default function RootLayout() {
    const { pathname } = useLocation();

    const isAuthPage = NO_NAVBAR_PAGES.includes(pathname);

    return (
        <div className="root-layout">
            {!isAuthPage && <Navbar />}
            <Outlet />
            {/* TODO: <Footer /> */}
        </div>
    );
}
