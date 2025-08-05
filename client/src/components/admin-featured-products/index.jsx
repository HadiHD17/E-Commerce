import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "@/api";
import ProductCard from "@/components/shared/product-card";
import ErrorAlert from "@/components/shared/error-alert";
import useAuth from "@/hooks/use-auth";
import "./admin-featured-products.css";

export default function AdminFeaturedProducts() {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);

                const { data } = await api.get("/common/featured_products", {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
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

    if (isLoading) {
        return (
            <div className="admin-featured-products">
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-featured-products">
                <ErrorAlert error={error} />
            </div>
        );
    }

    return (
        <div className="admin-featured-products">
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
