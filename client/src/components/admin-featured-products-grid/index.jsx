import ErrorAlert from "@/components/shared/error-alert";
import ProductCard from "@/components/shared/product-card";
import { useFetchDataWithAuth } from "@/hooks/use-fetch-data-with-auth";
import "./admin-featured-products-grid.css";

export default function AdminFeaturedProductsGrid() {
    const {
        data: products,
        isLoading,
        error,
    } = useFetchDataWithAuth("/common/featured_products", []);

    if (isLoading) {
        return (
            <div className="admin-featured-products-grid">
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-featured-products-grid">
                <ErrorAlert error={error} />
            </div>
        );
    }

    return (
        <div className="admin-featured-products-grid">
            {products.map(prod => (
                <ProductCard
                    key={prod.id}
                    id={prod.id}
                    category={prod.category}
                    img={prod.image[0]?.image_url ?? "https://placehold.co/200"}
                    name={prod.name}
                    price={prod.price}
                    stock={prod.stock}
                    isAdmin
                />
            ))}
        </div>
    );
}
