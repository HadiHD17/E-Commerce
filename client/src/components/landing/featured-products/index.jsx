import React, { useEffect, useState } from "react";
import ProductCard from "@/components/shared/product-card";
import "./featured-products.css";
import api from "@/api";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const loadFeaturedProducts = async () => {
        try {
            const res = await api.get("/common/featured_products", {
                headers: {
                    Accept: "application/json",
                },
            });
            setFeaturedProducts(res.data.payload);
            console.log("Featured products loaded:", res.data.payload);
        } catch (error) {
            console.error("Error fetching featured products:", error);
        }
    };
    useEffect(() => {
        loadFeaturedProducts();
    }, []);
    return (
        <div className="featured-section">
            <div className="featured-products-header">
                <h2>Featured Products</h2>
                <Link to="/search">
                    <h4>More Products</h4>
                </Link>
            </div>

            <div className="featured-products-cards">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
}
