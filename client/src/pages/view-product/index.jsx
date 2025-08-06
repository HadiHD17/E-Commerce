import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./productdetails.css";
import { productsSlice } from "@/store/slices/products-slice";
import api from "@/api";

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
        <div className="product-container">
            <div className="product-grid">
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

                <div className="product-details__info">
                    <h2 className="product-details__title">{product.name}</h2>
                    <p className="product-category">{product.category}</p>
                    {product.delivery && (
                        <p className="product-details__delivery">
                            {product.delivery}
                        </p>
                    )}

                    <div className="quantity-control">
                        <button
                            onClick={decrement}
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            onClick={increment}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    <h3 className="product-details__price">${product.price}</h3>
                    <button
                        className="add-to-cart"
                        onClick={handleAddToCart}
                        disabled={adding}
                    >
                        {adding ? "Adding..." : "Add to cart"}
                    </button>
                    {addError && <div className="error mt-2">{addError}</div>}
                    {addSuccess && (
                        <div className="success mt-2">{addSuccess}</div>
                    )}
                </div>
            </div>

            <div className="product-details__description">
                <h4>Description</h4>
                <p>{product.description}</p>
            </div>
        </div>
    );
}
