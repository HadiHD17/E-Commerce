import React from "react";
import { HeartIcon } from "@phosphor-icons/react";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
// import {Heart } from "@phosphor-icons/react";

const ProductCard = ({ id, name, img, price, stock, category, newPrice }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/products/${id}`);
    };
    return (
        <div className="product-card" onClick={handleClick}>
            {/* <Heart /> */}
            <div className="product-img">
                <img src={img}></img>
            </div>
            <div className="product-category">{category}</div>
            <div className="product-name">{name}</div>
            <div className="product-price">
                {newPrice ? (
                    <>
                        <div className="original-price">{price}$</div>
                        <div className="current-price">{newPrice}$</div>
                    </>
                ) : (
                    <div className="current-price">{price}$</div>
                )}
            </div>

            <div className={`product-stock ${stock === 0 ? "out" : ""}`}>
                {stock === 0 ? "Out of stock" : `${stock} left in stock`}
            </div>
        </div>
    );
};

export default ProductCard;
