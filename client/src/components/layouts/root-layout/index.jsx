import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Outlet, useLocation } from "react-router-dom";
import SearchWithAiButton from "@/components/shared/search-with-ai-button";
import "./root-layout.css";

const NO_NAVBAR_PAGES = ["/login", "/register", "/forgot-password"];
const NO_FOOTER_PAGES = ["/chat"];
const CHAT_PAGES = ["/", "/search", "/admin"];

export default function RootLayout() {
    const { pathname } = useLocation();

    const isNoNavPage = NO_NAVBAR_PAGES.includes(pathname);
    const isNoFooterPage = NO_FOOTER_PAGES.includes(pathname);
    const isChatPage = CHAT_PAGES.includes(pathname);

    return (
        <div className="root-layout">
            {!isNoNavPage && <Navbar />}
            <main className="root-layout__body flex-1">
                <Outlet />
                {isChatPage && <SearchWithAiButton />}
            </main>
            {!(isNoNavPage || isNoFooterPage) && <Footer />}
        </div>
    );
}
