import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./productdetails.css";
import { productsSlice } from "@/store/slices/productslice";
import api from "@/api";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.selectedProduct);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);

    const token = localStorage.getItem("auth-token");

    const fetchProduct = async () => {
        try {
            const res = await api.get(`customer/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            dispatch(
                productsSlice.actions.setSelectedProduct(res.data.payload),
            );
            setMainImage(res.data.images?.[0]);
        } catch (error) {
            console.error("Failed to fetch product", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id, dispatch]);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-container">
            <div className="product-grid">
                <div className="product-images">
                    <img src={mainImage} alt="Main" className="main-image" />
                    <div className="thumbnail-row">
                        {product.images?.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt=""
                                onClick={() => setMainImage(img)}
                                className="thumbnail"
                            />
                        ))}
                    </div>
                </div>

                <div className="product-info">
                    <h2 className="product-title">{product.name}</h2>
                    <p className="product-category">{product.category}</p>
                    <p className="product-delivery">{product.delivery}</p>

                    <div className="quantity-control">
                        <button onClick={decrement}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increment}>+</button>
                    </div>

                    <h3 className="product-price">${product.price}</h3>
                    <button className="add-to-cart">Add to cart</button>
                </div>
            </div>

            <div className="product-description">
                <h4>Description</h4>
                <p>{product.description}</p>
            </div>
        </div>
    );
}
