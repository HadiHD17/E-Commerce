import React from "react";
import "./category-card.css";

export default function CategoryCard({ img, name }) {
    return (
        <div className="category-card">
            <div className="category-box">
                <img src={img} alt={name} />
            </div>
            <div className="category-name">{name}</div>
        </div>
    );
}
