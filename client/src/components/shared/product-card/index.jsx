import React from "react";


const ProductCard = ({ name, img, price, stock, category, newPrice }) => {
    return <div className="product-card">
        <div className="product-img">
            <img src={img}></img>
            <div className="product-category">{category}</div>
            <div className="product-name">{name}</div>
            <div className="product-price">{price}$</div>
            <div className="product-stock">{stock} left in stock</div>
        </div>
    </div>;
};

export default ProductCard;