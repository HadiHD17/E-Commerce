import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Outlet, useLocation } from "react-router-dom";
import SearchWithAiButton from "@/components/shared/search-with-ai-button";
import "./main-layout.css";

const NO_NAVBAR_PAGES = ["/login", "/register", "/forgot-password"];
const FOOTER_PAGES = ["/"];
const CHAT_PAGES = ["/", "/search"];

export default function MainLayout() {
    const { pathname } = useLocation();

    const isNoNavPage = NO_NAVBAR_PAGES.includes(pathname);
    const isFooterPage = FOOTER_PAGES.includes(pathname);
    const isChatPage = CHAT_PAGES.includes(pathname);

    return (
        <div className="main-layout">
            {!isNoNavPage && <Navbar />}
            <main className="main-layout__body">
                <Outlet />
                {isChatPage && <SearchWithAiButton />}
            </main>
            {isFooterPage && !isNoNavPage && <Footer />}
        </div>
    );
}
