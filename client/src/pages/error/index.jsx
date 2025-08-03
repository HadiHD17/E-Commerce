import React from "react";
import { useNavigate } from "react-router-dom";
import "./notfound.css";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="circle">
                <span className="animated-404">404</span>
            </div>
            <h2 className="oops-text">Oops! Page Not Found</h2>
            <p className="not-found-message">
                The page you're looking for seems to have wandered off. Don't
                worry, our best products are still here waiting for you!
            </p>
            <button className="back-button" onClick={() => navigate("/")}>
                Back To Home
            </button>
        </div>
    );
}
