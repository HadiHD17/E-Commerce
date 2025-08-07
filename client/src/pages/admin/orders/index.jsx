import { useState } from "react";
import { AxiosError } from "axios";
import ErrorAlert from "@/components/shared/error-alert";
import OrderRow from "@/components/shared/order-row";
import { useFetchDataWithAuth } from "@/hooks/use-fetch-data-with-auth";
import useAuth from "@/hooks/use-auth";
import api from "@/api";
import "./admin-orders.css";

export default function AdminOrdersPage() {
    const {
        data: orders,
        isLoading,
        error,
    } = useFetchDataWithAuth("/admin/todays_orders", []);

    const [search, setSearch] = useState("");
    const [orderStatusError, setOrderStatusError] = useState(null);
    const { token } = useAuth();

    async function updateStatus(orderId) {
        try {
            setOrderStatusError(null);

            await api.post(
                `/admin/set_order_status/${orderId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } },
            );
            window.location.reload();
        } catch (err) {
            if (err instanceof AxiosError) {
                setOrderStatusError(err.response.data);
            } else {
                setOrderStatusError("An unknown error occurred");
            }
        }
    }

    let ordersContent;
    if (isLoading) {
        ordersContent = <p>Loading orders...</p>;
    } else if (error) {
        ordersContent = <ErrorAlert error={error} />;
    } else {
        ordersContent =
            orders.length === 0 ? (
                <p className="text-gray-700">No orders to be found. 🤷‍♂️</p>
            ) : (
                orders
                    .filter(order =>
                        search ? String(order.id).includes(search) : true,
                    )
                    .map(order => (
                        <OrderRow
                            key={order.id}
                            id={order.id}
                            status={order.status}
                            total={order.total_price}
                            customer={order.user.name}
                            date={new Date(order.updated_at).toLocaleDateString(
                                "en-UK",
                            )}
                            onUpdateStatus={updateStatus}
                        />
                    ))
            );
    }

    return (
        <div className="admin-container">
            <div className="admin-orders-main">
                {orderStatusError && <ErrorAlert error={orderStatusError} />}
                <div className="orders-content">
                    <input
                        type="text"
                        placeholder="Search by Order Number"
                        className="order-search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
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
