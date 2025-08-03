import React from "react";
import AccountSidebar from "@/components/shared/account-sidebar";
import OrderCard from "@/components/shared/order-card";
import "./my-orders.css";

const ordersData = [
    {
        image: "/test-images/688a90f995ca1_test_photo.jpg",
        productName: "NVIDIA GeForce RTX 4070",
        quantity: 1,
        price: 399.32,
        address: "123 abc st., Bchamoun, Lebanon",
        orderId: "1234-4321-01",
        statusClass: "green",
        statusText: "Arrives in 1 day",
    },
    {
        image: "/test-images/688a90f995ca1_test_photo.jpg",
        productName: "NVIDIA GeForce RTX 4070",
        quantity: 1,
        price: 399.32,
        address: "123 abc st., Bchamoun, Lebanon",
        orderId: "1234-4321-02",
        statusClass: "gray",
        statusText: "Delivered",
    },
    {
        image: "/test-images/688a90f995ca1_test_photo.jpg",
        productName: "NVIDIA GeForce RTX 4070",
        quantity: 1,
        price: 399.32,
        address: "123 abc st., Bchamoun, Lebanon",
        orderId: "1234-4321-03",
        statusClass: "red",
        statusText: "Cancelled",
    },
];

export default function MyOrders() {
    return (
        <div className="orders-container">
            <AccountSidebar />
            <div className="orders-main">
                <div className="tabs">
                    <button className="tab active">All Orders</button>
                    <button className="tab">Delivered</button>
                    <button className="tab">Packed</button>
                    <button className="tab">Cancelled</button>
                </div>

                <div className="orders-list">
                    {ordersData.map(order => (
                        <OrderCard
                            key={order.orderId}
                            order={order}
                            statusClass={order.statusClass}
                            statusText={order.statusText}
                        />
                    ))}
                </div>
                <button className="load-more">Load more</button>
            </div>
        </div>
    );
}
