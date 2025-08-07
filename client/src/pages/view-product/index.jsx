import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PlusIcon, MinusIcon } from "@phosphor-icons/react";
import api from "@/api";
import { productsSlice } from "@/store/slices/products-slice";
import "./productdetails.css";
import Button from "@/components/shared/button";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.selectedProduct);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [adding, setAdding] = useState(false);
    const [addError, setAddError] = useState(null);
    const [addSuccess, setAddSuccess] = useState(null);

    const fetchProduct = async () => {
        try {
            const token = localStorage.getItem("auth-token");
            const res = await api.get(`customer/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            const payload = res.data?.payload || {};
            dispatch(productsSlice.actions.setSelectedProduct(payload));

            const first = payload.image?.[0]?.image_url || "";
            setMainImage(first);
        } catch (error) {
            console.error(
                "Failed to fetch product",
                error?.response?.data || error,
            );
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const increment = () => setQuantity(p => p + 1);
    const decrement = () => setQuantity(p => Math.max(1, p - 1));

    async function handleAddToCart() {
        setAddError(null);
        setAddSuccess(null);

        const token = localStorage.getItem("auth-token");
        if (!token) {
            setAddError("You must be logged in.");
            return;
        }

        if (!product?.id) {
            setAddError("Invalid product.");
            return;
        }

        if (quantity <= 0) {
            setAddError("Quantity must be at least 1.");
            return;
        }

        try {
            setAdding(true);

            const url = "customer/manage_cart_item";

            const payload = {
                product_id: product.id,
                quantity,
                action: "add",
            };

            await api.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            setAddSuccess("Added to cart!");
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Failed to add to cart";
            setAddError(msg);
            console.error("Add to cart error:", err?.response?.data || err);
        } finally {
            setAdding(false);
        }
    }

    if (!product) return <div>Loading...</div>;

    const images = (product.image || [])
        .map(it => (typeof it === "string" ? it : it?.image_url))
        .filter(Boolean);

    return (
        <div className="product-container container">
            <div className="product-details__grid">
                <div className="product-details__images">
                    {mainImage ? (
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="main-image"
                        />
                    ) : (
                        <div className="main-image placeholder">No image</div>
                    )}

                    <div className="thumbnail-row">
                        {images.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`${product.name} ${i + 1}`}
                                onClick={() => setMainImage(src)}
                                className={`thumbnail ${
                                    src === mainImage ? "active" : ""
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-details__info bg-gray-100 border-subtle shadow-2xs rounded-lg">
                    <div className="product-details__hgroup">
                        <h2 className="product-details__name fs-h2">
                            {product.name}
                        </h2>
                        <p className="product-details__category fs-caption fs-caption fw-semibold border-subtle rounded-full">
                            {product.category ?? "Other"}
                        </p>
                        {product.delivery && (
                            <p className="product-details__delivery">
                                {product.delivery}
                            </p>
                        )}
                    </div>

                    <p className="product-details__price fs-h2">
                        ${product.price}
                    </p>

                    <div className="quantity-control">
                        <button
                            className="quantity-control__button d-inline-flex justify-center bg-gray-700 text-white rounded-base"
                            onClick={decrement}
                            aria-label="Decrease quantity"
                        >
                            <MinusIcon />
                        </button>
                        <span className="fw-bold">{quantity}</span>
                        <button
                            className="quantity-control__button d-inline-flex justify-center bg-gray-700 text-white rounded-base"
                            onClick={increment}
                            aria-label="Increase quantity"
                        >
                            <PlusIcon />
                        </button>
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        color="brand"
                        disabled={adding}
                    >
                        {adding ? "Adding..." : "Add to cart"}
                    </Button>
                    {addError && <div className="error">{addError}</div>}
                    {addSuccess && <div className="success">{addSuccess}</div>}
                </div>
            </div>

            <div className="product-details__description">
                <h2 className="fs-h2">Description</h2>
                <p>{product.description}</p>
            </div>
        </div>
    );
}
