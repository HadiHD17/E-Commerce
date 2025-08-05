import React from "react";
import ProductCard from "@/components/shared/product-card";
import Navbar from "@/components/shared/navbar";
import HeroSection from "@/components/landing/hero-section";
import CategoriesSection from "@/components/landing/categories";
import FeaturedProducts from "@/components/landing/featured-products";
import "./landing.css"

const Landing = () => {
    return <div className="landing">
        <Navbar />
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
    </div>;
};

export default Landing;
