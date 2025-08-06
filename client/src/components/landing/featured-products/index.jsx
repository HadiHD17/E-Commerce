import React, { useEffect, useState } from "react";
import ProductCard from "@/components/shared/product-card";
import api from "@/api";
import { Link } from "react-router-dom";
import "./featured-products.css";

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
        } catch (error) {
            console.error("Error fetching featured products:", error);
        }
    };
    useEffect(() => {
        loadFeaturedProducts();
    }, []);

    return (
        <section className="container home-page-section featured-section">
            <div className="featured-products-header">
                <h2 className="fs-h2">Featured Products</h2>
                <Link to="/search" className="fs-button">
                    More Products →
                </Link>
            </div>

            <div className="featured-products-cards">
                {featuredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        img={product.image?.[0]?.image_url}
                        {...product}
                    />
                ))}
                {featuredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        img={product.image?.[0]?.image_url}
                        {...product}
                    />
                ))}
            </div>
        </section>
    );
}
