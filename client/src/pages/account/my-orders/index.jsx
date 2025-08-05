import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordersSlice } from "@/store/slices/orders-slice";
import OrderCard from "@/components/shared/order-card";
import api from "@/api";
import "./my-orders.css";

const { setOrders, setFilter } = ordersSlice.actions;

const statusClassMap = {
    pending: "status-pending",
    shipped: "status-shipped",
    delivered: "status-delivered",
    paid: "status-paid",
    cancelled: "status-cancelled",
    packed: "status-packed",
};

export default function MyOrdersPage() {
    const dispatch = useDispatch();
    const { list, filter } = useSelector(state => state.orders);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("auth-token");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await api.get("customer/account/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const transformed = res.data.payload.flatMap(order =>
                order.order_items.map(item => ({
                    orderId: order.id,
                    statusText: order.status.toUpperCase(),
                    statusClass:
                        statusClassMap[order.status.toLowerCase()] ||
                        "status-default",
                    productName: item.product.name,
                    quantity: item.quantity,
                    price: item.price_at_time,
                    // image: item.product.image || "/images/products/default.jpg", // if image exists
                    status: order.status,
                })),
            );

            dispatch(setOrders(transformed));
        } catch {
            setError("Failed to load orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [dispatch]);

    const filteredOrders =
        filter === "all"
            ? list
            : list.filter(order => order.status.toLowerCase() === filter);

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
