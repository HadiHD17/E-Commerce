import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Outlet, useLocation } from "react-router-dom";
import SearchWithAiButton from "@/components/shared/search-with-ai-button";
import "./root-layout.css";

const NO_NAVBAR_PAGES = ["/login", "/register", "/forgot-password"];
const NO_FOOTER_PAGES = ["/chat"];

export default function RootLayout() {
    const { pathname } = useLocation();

    const isNoNavPage = NO_NAVBAR_PAGES.includes(pathname);
    const isNoFooterPage = NO_FOOTER_PAGES.includes(pathname);
    const isChatPage = pathname === "/chat";

    return (
        <div className="root-layout">
            {!isNoNavPage && <Navbar isSignedIn={true} />}
            <main className="root-layout__body flex-1">
                <Outlet />
                {!isChatPage && <SearchWithAiButton />}
            </main>
            {!(isNoNavPage || isNoFooterPage) && <Footer />}
        </div>
    );
}
