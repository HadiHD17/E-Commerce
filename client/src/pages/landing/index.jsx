import React from "react";
import Navbar from "@/components/shared/navbar";
import HeroSection from "@/components/landing/hero-section";
import CategoriesSection from "@/components/landing/categories";
import FeaturedProducts from "@/components/landing/featured-products";

export default function LandingPage() {
    return (
        <div className="landing">
            <HeroSection />
            <CategoriesSection />
            <FeaturedProducts />
        </div>
    );
}
