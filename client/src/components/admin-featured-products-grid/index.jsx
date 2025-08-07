import ErrorAlert from "@/components/shared/error-alert";
import ProductCard from "@/components/shared/product-card";
import { useFetchDataWithAuth } from "@/hooks/use-fetch-data-with-auth";

export default function AdminFeaturedProductsGrid() {
    const {
        data: products,
        isLoading,
        error,
    } = useFetchDataWithAuth("/common/featured_products", []);

    return isLoading ? (
        <p>Loading products...</p>
    ) : error ? (
        <ErrorAlert error={error} />
    ) : (
        <div className="products-grid">
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
