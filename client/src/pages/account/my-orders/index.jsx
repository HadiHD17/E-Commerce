import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderSlice } from "@/store/slices/orderslice";
import OrderCard from "@/components/shared/order-card";
import "./my-orders.css";
import api from "@/api";

const { setOrders, setFilter } = orderSlice.actions;

export default function MyOrdersPage() {
    const dispatch = useDispatch();
    const { list, filter } = useSelector(state => state.orders);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("auth-token");

    const getStatusClass = status => {
        switch (status.toLowerCase()) {
            case "pending":
                return "status-pending";
            case "shipped":
                return "status-shipped";
            case "delivered":
                return "status-delivered";
            case "paid":
                return "status-paid";
            case "cancelled":
                return "status-cancelled";
            case "packed":
                return "status-packed";
            default:
                return "status-default";
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await api.get("customer/account/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Transform orders: flatten each product in order_items
            const transformed = res.data.payload.flatMap(order => {
                return order.order_items.map(item => ({
                    orderId: order.id,
                    statusText: order.status.toUpperCase(),
                    statusClass: getStatusClass(order.status),
                    productName: item.product.name,
                    quantity: item.quantity,
                    price: item.price_at_time,
                    // image: "/images/products/default.jpg",
                    status: order.status,
                }));
            });

            dispatch(setOrders(transformed));
        } catch (err) {
            setError("Failed to load orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [dispatch]);

    const filteredOrders = list.filter(order => {
        if (filter === "all") return true;
        return order.status.toLowerCase() === filter;
    });

    return (
        <div className="orders-container">
            <div className="orders-main">
                <div className="tabs">
                    {[
                        "all",
                        "delivered",
                        "shipped",
                        "packed",
                        "paid",
                        "pending",
                        "cancelled",
                    ].map(f => (
                        <button
                            key={f}
                            className={`tab ${filter === f ? "active" : ""}`}
                            onClick={() => dispatch(setFilter(f))}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="orders-list">
                    {loading && <p>Loading orders...</p>}
                    {error && <p className="error">{error}</p>}
                    {!loading && filteredOrders.length === 0 && (
                        <p>No orders found.</p>
                    )}

                    {filteredOrders.map(order => (
                        <OrderCard
                            key={`${order.orderId}-${order.productName}`}
                            order={order}
                            statusClass={order.statusClass}
                            statusText={order.statusText}
                        />
                    ))}
                </div>

                {!loading && filteredOrders.length > 0 && (
                    <button className="load-more">Load more</button>
                )}
            </div>
        </div>
    );
}
