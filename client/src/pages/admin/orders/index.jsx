import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "@/api";
import ErrorAlert from "@/components/shared/error-alert";
import useAuth from "@/hooks/use-auth";
import OrderRow from "@/components/shared/order-row";
import "./admin-orders.css";

export default function AdminOrdersPage() {
    const { token, isLoading: isAuthLoading } = useAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAuthLoading) return;
        const controller = new AbortController();

        async function fetchOrders() {
            try {
                setIsLoading(true);

                const { data } = await api.get("/admin/todays_orders", {
                    headers: {
                        Authorization: `bearer ${token}`,
                        signal: controller.signal,
                    },
                });
                setOrders(data.payload);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setError(err.response.data);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchOrders();

        return () => controller.abort(); // cancel on cleanup
    }, [isAuthLoading, token]);

    let ordersContent;
    if (isLoading) {
        ordersContent = <p>Loading products...</p>;
    } else if (error) {
        ordersContent = <ErrorAlert error={error} />;
    } else {
        ordersContent =
            orders.length === 0 ? (
                <p className="text-gray-700">No orders to be found. 🤷‍♂️</p>
            ) : (
                orders.map(order => (
                    <OrderRow
                        key={order.id}
                        id={order.id}
                        status={order.status}
                        total={order.total_price}
                        customer={order.user.name}
                        date={new Date(order.updated_at).toLocaleDateString(
                            "en-UK",
                        )}
                    />
                ))
            );
    }

    return (
        <div className="admin-container">
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
                        <tbody>{ordersContent}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
