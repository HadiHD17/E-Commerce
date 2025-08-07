import ErrorAlert from "@/components/shared/error-alert";
import OrderRow from "@/components/shared/order-row";
import { useFetchDataWithAuth } from "@/hooks/use-fetch-data-with-auth";
import "./admin-orders.css";

export default function AdminOrdersPage() {
    const {
        data: orders,
        isLoading,
        error,
    } = useFetchDataWithAuth("/admin/todays_orders", []);

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
