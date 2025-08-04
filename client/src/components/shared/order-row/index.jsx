import React from "react";
import "./order-row.css";

const statusClasses = {
    Packed: "status packed",
    Shipped: "status shipped",
    Paid: "status paid",
    Pending: "status pending",
    Canceled: "status canceled",
};

export default function OrderRow({ id, customer, status, total, date }) {
    return (
        <tr>
            <td>{id}</td>
            <td>{customer}</td>
            <td>
                <button className={statusClasses[status]}>{status}</button>
            </td>
            <td>{total}</td>
            <td>{date}</td>
            <td>
                <button className="status canceled">Canceled</button>
            </td>
        </tr>
    );
}
