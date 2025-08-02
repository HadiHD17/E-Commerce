import React from "react";
import "./admin-all-products.css";
import Pagination from "@/components/shared/pagination";
import Sidebar from "@/components/shared/sidebar";
import ProductCard from "@/components/shared/product-card";
import FiltersPanel from "@/components/shared/filterspanel";

export default function AdminAllProducts() {
    const dummyProducts = Array(8).fill({
        id: 1,
        name: "Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey",
        price: "$1500",
        category: "Laptop",
        stock: 5,
    });
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="admin-main">
                <div className="admin-products">
                    <div className="products-header">
                        <h2>All Products</h2>
                        <input
                            type="text"
                            placeholder="Search all products..."
                            className="product-search"
                        />
                    </div>

                    <div className="products-content">
                        <div className="products-grid">
                            {dummyProducts.map(product => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>

                        <FiltersPanel />
                    </div>
                    <Pagination />
                </div>
            </div>
        </div>
    );
}
