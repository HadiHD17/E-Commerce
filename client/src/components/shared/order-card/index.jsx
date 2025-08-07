import React from "react";
import "./order-card.css";

export default function OrderCard({ order, statusClass, statusText }) {
    return (
        <div className="order-card">
            <div className="order-left">
                <img src={order.image} alt={order.productName} />
            </div>
            <div className="order-middle">
                <h4>{order.productName}</h4>
                <p>{order.quantity}x</p>
                <p className="price">${order.price}</p>
                <p className="address">Address: {order.address}</p>
            </div>
            <div className="order-right">
                <p className="order-id">Order #: {order.orderId}</p>
                <p className={`status ${statusClass}`}>{statusText}</p>
                <button className="view-btn">View Details →</button>
            </div>
        </div>
    );
}
