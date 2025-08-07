import React from "react";
import "./category-card.css";
import { Desktop, Printer, Table } from "@phosphor-icons/react";

export default function CategoryCard({ img, name }) {
    const categoryImages = {
        Electronics: "/categories/electroniccategory.jpg",
        Wearables: "/categories/wearablecategory.jpg",
        TVs: "/categories/tvcategory.webp",
        Accessories: "/categories/accessoriescategory.jpeg",
        Home_Appliances: "/categories/homeappliances.jpg",
        Smartphones: "/categories/phonecategory.jpg",
        Laptops: "/categories/laptopcategory.webp",
        Monitors: "/categories/monitorcategory.jpg",
        Audio: "/categories/airpodcategory.jpg",
        Cameras: "/categories/cameracategory.jpeg",
        Gaming: "/categories/gamingcategory.png",
        Tablets: "/categories/tabletcategory.avif",
        Desktops: "/categories/desktopcategory.webp",
        Drones: "/categories/DroneCategory.jpg",
        Printers: "/categories/printercategory.jpeg",
        Smart_Home: "/categories/smarthomecategory.jpg",
        Storage: "/categories/storagecategory.jpg",
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
