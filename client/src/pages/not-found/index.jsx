import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/shared/button";
import "./not-found.css";

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
            <Button color="brand" onClick={() => navigate("/")}>
                Back To Home
            </Button>
        </div>
    );
}
