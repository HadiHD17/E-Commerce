import React, { useEffect, useState } from "react";
import "./categories-section.css";
import CategoryCard from "@/components/shared/category";
import api from "@/api";

export default function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const loadCategories = async () => {
        try {
            const res = await api.get("/common/categories", {
                headers: {
                    Accept: "application/json",
                },
            });
            setCategories(res.data.payload);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    useEffect(() => {
        loadCategories();
    }, []);
    return (
        <div className="categories-section">
            <h2>Shop By Categories</h2>
            <div className="categories-cards">
                {categories.map((category, i) => (
                    <CategoryCard key={i} name={category} />
                ))}
            </div>
        </div>
    );
}
