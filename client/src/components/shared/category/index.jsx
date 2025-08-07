import React from "react";
import "./category-card.css";

export default function CategoryCard({ img, name }) {
    const categoryImages = {
        "Electronics": "/categories/electroniccategory.jpg",
        "Wearables": "/categories/wearablecategory.jpg",
        "TVs": "/categories/tvcategory.webp",
        "Accessories": "/categories/accessoriescategory.jpeg",
        "Home Appliances": "/categories/homeappliances.jpg",
        "Smartphones": "/categories/phonecategory.webp",
        "Laptops": "/categories/laptopcategory.webp",
        "Monitors": "/categories/monitorcategory.jpg",
        "Audio": "/categories/airpodcategory.jpg",
        "Cameras": "/categories/cameracategory.jpeg",
        "Gaming": "/categories/gamingcategory.png",
        "Tablets": "/categories/tabletcategory.avif",
        "Desktops": "/categories/desktopcategory.webp",
        "Drones": "/categories/DroneCategory.jpg",
        "Printers": "/categories/printercategory.jpeg",
        "Smart Home": "/categories/smarthomecategory.jpg",
        "Storage": "/categories/storagecategory.jpg",
    };
    const imageSrc = categoryImages[name] || "/categories/defaultcategory.jpg";
    return (
        <div className="category-card">
            <div className="category-box">
                <img src={imageSrc} alt={name} />
            </div>
            <div className="category-name">{name}</div>
        </div>
    );
}
