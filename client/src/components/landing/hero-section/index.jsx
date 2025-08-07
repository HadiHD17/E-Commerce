import React from "react";
import "./hero-section.css";

export default function HeroSection() {
    return (
        <div className="hero-section">
            <div className="row">
                <div className="box half">
                    <img src="/offers/image11.jpg" />
                </div>
                <div className="box half">
                    <img src="/offers/image15.jpg" />
                </div>
                <div className="box full">
                    <img src="/offers/image8.jpg" />
                </div>
            </div>
            <div className="row">
                <div className="box full">
                    <img src="/offers/image16.jpg" />
                </div>
                <div className="box half">
                    <img src="/offers/image13.jpg" />
                </div>
                <div className="box half">
                    <img src="/offers/image12.jpg" />
                </div>
            </div>
        </div>
    );
}
