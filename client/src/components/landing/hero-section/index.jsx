import React from "react";
import "./hero-section.css";

export default function HeroSection() {
    return (
        <div className="hero-section">
            <div className="row">
                <div className="box half"><img src="/img1.jpg" /></div>
                <div className="box half"><img src="/img2.jpg" /></div>
                <div className="box full"><img src="/img3.jpg" /></div>
            </div>
            <div className="row">
                <div className="box full"><img src="/img4.jpg" /></div>
                <div className="box half"><img src="/img5.jpg" /></div>
                <div className="box half"><img src="/img6.jpg" /></div>
            </div>
        </div>
    );
}
