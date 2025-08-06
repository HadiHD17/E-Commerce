import { useState } from "react";
import Pagination from "@/components/shared/pagination";
import ProductCard from "@/components/shared/product-card";
import ErrorAlert from "@/components/shared/error-alert";
import FiltersPanel from "@/components/filters-panel";
import { useFetchDataWithAuth } from "@/hooks/use-fetch-data-with-auth";
import "./admin-products.css";

export default function AdminProductsPage() {
    const [search, setSearch] = useState("");

    const {
        data: products,
        isLoading,
        error,
    } = useFetchDataWithAuth("/admin/products", []);

    let productsContent;
    if (isLoading) {
        productsContent = <p>Loading products...</p>;
    } else if (error) {
        productsContent = <ErrorAlert error={error} />;
    } else {
        productsContent =
            products.length === 0 ? (
                <p className="text-gray-700">No products found. 🤷‍♂️</p>
            ) : (
                <div className="admin__products-grid products-grid">
                    {products.map(prod => (
                        <ProductCard
                            key={prod.id}
                            id={prod.id}
                            category={prod.category}
                            img={
                                prod.image[0]?.image_url ??
                                "https://placehold.co/200"
                            }
                            name={prod.name}
                            price={prod.price}
                            stock={prod.stock}
                            isAdmin
                        />
                    ))}
                </div>
            );
    }

    return (
        <div className="admin-container">
            <div className="admin-main">
                <div className="admin-products">
                    <div className="products-header">
                        <h2>All Products</h2>
                        <input
                            type="text"
                            placeholder="Search all products..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="product-search"
                        />
                    </div>

                    <div className="products-content">
                        {productsContent}

                        <FiltersPanel />
                    </div>
                    <Pagination />
                </div>
            </div>
        </div>
    );
}
