import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "@/api";
import Pagination from "@/components/shared/pagination";
import ProductCard from "@/components/shared/product-card";
import ErrorAlert from "@/components/shared/error-alert";
import useAuth from "@/hooks/use-auth";
import FiltersPanel from "@/components/filters-panel";
import "./admin-products.css";

export default function AdminProductsPage() {
    const { token } = useAuth();
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);

                const { data } = await api.get("/admin/products", {
                    headers: { Authorization: `bearer ${token}` },
                });
                setProducts(data.payload);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setError(err.response.data);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, [token]);

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
                <div className="products-grid">
                    {products.map(prod => (
                        <ProductCard
                            key={prod.id}
                            id={prod.id}
                            category={prod.category}
                            img={prod.image[0].image_url}
                            name={prod.name}
                            price={prod.price}
                            stock={prod.stock}
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
