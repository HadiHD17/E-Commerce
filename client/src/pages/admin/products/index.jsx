import React from "react";
import Pagination from "@/components/shared/pagination";
import AdminSidebar from "@/components/admin-sidebar";
import ProductCard from "@/components/shared/product-card";
import FiltersPanel from "@/components/filters-panel";
import "./admin-products.css";

export default function AdminProductsPage() {
    const dummyProducts = Array(8).fill({
        id: 1,
        name: "Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey",
        price: "$1500",
        category: "Laptop",
        stock: 5,
    });
    return (
        <div className="admin-container">
            <AdminSidebar />
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
