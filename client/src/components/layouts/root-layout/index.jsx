import Navbar from "@/components/shared/navbar";
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./root-layout.css";

const NO_NAVBAR_PAGES = ["/login", "/register", "/forgot-password"];

export default function RootLayout() {
    const { pathname } = useLocation();

    const isAuthPage = NO_NAVBAR_PAGES.includes(pathname);

    const [isSignedIn, setIsSignedIn] = useState(true);

    return (
        <div className="root-layout">
            {!isAuthPage && (
                <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            )}
            <Outlet />
            {/* TODO: <Footer /> */}
        </div>
    );
}
