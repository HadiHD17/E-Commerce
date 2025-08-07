import React from "react";
import "./order-row.css";

const statusClasses = {
    packed: "status packed",
    shipped: "status shipped",
    paid: "status paid",
    pending: "status pending",
    canceled: "status canceled",
};

export default function OrderRow({
    id,
    customer,
    status,
    total,
    date,
    onUpdateStatus,
}) {
    return (
        <tr>
            <td>{id}</td>
            <td>{customer}</td>
            <td>
                <button
                    className={statusClasses[status]}
                    onClick={() => onUpdateStatus(id)}
                >
                    {status}
                </button>
            </td>
            <td>{total}</td>
            <td>{date}</td>
            <td>
                <button className="status canceled">Canceled</button>
            </td>
        </tr>
    );
}
