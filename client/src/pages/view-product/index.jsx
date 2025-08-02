import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./productdetails.css";
import Navbar from "@/components/shared/navbar";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const increment = () => setQuantity(quantity + 1);
    const decrement = () => setQuantity(quantity - 1);
    const mockProduct = {
        id: 1,
        title: "Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey",
        price: 1300,
        category: "Laptop",
        delivery: "2 days delivery",
        images: [
            "/test-images/688a90f995ca1_test_photo.jpg",
            "/test-images/688a90f995ca1_test_photo.jpg",
            "/test-images/688a90f995ca1_test_photo.jpg",
            "/test-images/688a90f995ca1_test_photo.jpg",
        ],
        description: `The Apple MacBook Air 15” (2023) in Space Grey features a powerful M2 chip, combining strong performance with energy efficiency...`,
    };

    useEffect(() => {
        setProduct(mockProduct);
        setMainImage(mockProduct.images[0]);
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-container">
            <div className="product-grid">
                <div className="product-images">
                    <img src={mainImage} alt="Main" className="main-image" />
                    <div className="thumbnail-row">
                        {product.images.map((img, i) => (
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
                    <h2 className="product-title">{product.title}</h2>
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
