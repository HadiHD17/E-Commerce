import React from "react";
import "./categories-section.css";
import CategoryCard from "@/components/shared/category";

export default function CategoriesSection() {
    return (
        <div className="categories-section">
            <h2>Shop By Categories</h2>
            <div className="categories-cards">
                <CategoryCard name={"Accessories"} img={"/test-images/688a90f995ca1_test_photo.jpg"}/>
                <CategoryCard name={"Accessories"} img={"/test-images/688a90f995ca1_test_photo.jpg"}/>
                <CategoryCard name={"Accessories"} img={"/test-images/688a90f995ca1_test_photo.jpg"}/>
                <CategoryCard name={"Accessories"} img={"/test-images/688a90f995ca1_test_photo.jpg"}/>
                <CategoryCard name={"Accessories"} img={"/test-images/688a90f995ca1_test_photo.jpg"}/>
                <CategoryCard name={"Accessories"} img={"/test-images/688a90f995ca1_test_photo.jpg"}/>
                
            </div>
        </div>
    );
}
