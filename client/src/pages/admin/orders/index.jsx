import React from "react";
import AdminSidebar from "@/components/admin-sidebar";
import OrderRow from "@/components/shared/order-row";
import "./admin-orders.css";

export default function AdminOrdersPage() {
    const orders = Array(15).fill({
        id: "#123638",
        customer: "John M. Doe",
        status: "Pending",
        total: "$4500",
        date: "2025-12-08",
    });

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-main">
                <div className="orders-content">
                    <input
                        type="text"
                        placeholder="Search by Order Number"
                        className="order-search"
                    />
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Creation Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, i) => (
                                <OrderRow key={i} {...order} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
