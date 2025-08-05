import React from "react";
import "./hero-section.css";

export default function HeroSection() {
    return (
        <div className="hero-section">
            <div className="row">
                <div className="box half">
                    <img src="/offers/image1.jpeg" />
                </div>
                <div className="box half">
                    <img src="/offers/image2.jpeg" />
                </div>
                <div className="box full">
                    <img src="/offers/image3.jpeg" />
                </div>
            </div>
            <div className="row">
                <div className="box full">
                    <img src="/offers/image4.jpeg" />
                </div>
                <div className="box half">
                    <img src="/offers/image5.jpeg" />
                </div>
                <div className="box half">
                    <img src="/offers/image6.jpeg" />
                </div>
            </div>
        </div>
    );
}
