import React from "react";
import ProductCard from "@/components/shared/product-card";
import "./featured-products.css";

export default function FeaturedProducts() {
    return (
        <div className="featured-section">
            <div className="featured-products-header">
                <h2>Featured Products</h2>
                <h4>More Products</h4>
            </div>
            
            <div className="featured-products-cards">
                <ProductCard
                    name={"Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey"}
                    img={"/test-images/688a90f995ca1_test_photo.jpg"}
                    price={1500}
                    stock={6}
                    category={"Laptop"}
                />
                <ProductCard
                    name={"Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey"}
                    img={"/test-images/688a90f995ca1_test_photo.jpg"}
                    price={1500}
                    stock={0}
                    category={"Laptop"}
                />
                <ProductCard
                    name={"Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey"}
                    img={"/test-images/688a90f995ca1_test_photo.jpg"}
                    price={1500}
                    newPrice={1200}
                    stock={6}
                    category={"Laptop"}
                />
                <ProductCard
                    name={"Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey"}
                    img={"/test-images/688a90f995ca1_test_photo.jpg"}
                    price={1500}
                    stock={6}
                    category={"Laptop"}
                />

                <ProductCard
                    name={"Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey"}
                    img={"/test-images/688a90f995ca1_test_photo.jpg"}
                    price={1500}
                    stock={6}
                    category={"Laptop"}
                />
                <ProductCard
                    name={"Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey"}
                    img={"/test-images/688a90f995ca1_test_photo.jpg"}
                    price={1500}
                    stock={6}
                    category={"Laptop"}
                />
                <ProductCard
                    name={"Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey"}
                    img={"/test-images/688a90f995ca1_test_photo.jpg"}
                    price={1500}
                    stock={6}
                    category={"Laptop"}
                />
                
                
            </div>
        </div>
    );
}
