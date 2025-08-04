import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container d-flex flex-col items-center text-center gap-5">
                <Link to="/" className="footer__logo">
                    <img src="/logo-black.svg" alt="Logo" height={36} />
                </Link>

                <p className="text-gray-400">
                    {new Date().getUTCFullYear()} &copy; <strong>Volta</strong>.
                    All rights reserved.
                </p>

                <div className="footer__divider" />

                <div className="d-flex items-center justify-center flex-wrap gap-x-6 gap-y-4 fs-button">
                    <Link to="/terms" className="footer__link">
                        Terms
                    </Link>
                    <Link to="/privacy" className="footer__link">
                        Privacy Policy
                    </Link>
                    <Link to="/contact" className="footer__link">
                        Contact Us
                    </Link>
                    <Link to="/shipping-policy" className="footer__link">
                        Shipping Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
