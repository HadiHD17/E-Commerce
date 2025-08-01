import React from "react";
import ProductCard from "@/components/shared/product-card";

const Landing = () => {
    return (
        <div className="hi">
            <div className="card">
                <ProductCard
                    name={
                        "Apple MacBook Air 15” w/ Touch  - Space Grey"
                    }
                    img={
                        "server/storage/app/public/product_images/product_4/688a90f995ca1_test_photo.jpg"
                    }
                />
            </div>
        </div>
    );
};

export default Landing;
