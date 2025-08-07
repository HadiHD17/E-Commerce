import React, { useState } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import "./cart-item.css";
import api from "@/api";

/**
 * Props:
 * - item: {
 *     id: product id,
 *     name, price, category, image, quantity
 *   }
 * - onChanged?: function()   // optional: parent can refetch cart after any change
 */
export default function CartItem({ item, onChanged }) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);

    const productId = item.id;

    const postManage = async payload => {
        try {
            setBusy(true);
            setError(null);

            const token = localStorage.getItem("auth-token");
            await api.post("customer/manage_cart_item", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (typeof onChanged === "function") onChanged();
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Failed to update cart";
            setError(msg);
            console.error("Cart manage error:", err?.response?.data || err);
        } finally {
            setBusy(false);
        }
    };

    const increment = async () => {
        const nextQty = Number(item.quantity || 1) + 1;
        await postManage({
            product_id: productId,
            quantity: nextQty,
            action: "update",
        });
    };

    const decrement = async () => {
        const current = Number(item.quantity || 1);
        const nextQty = Math.max(0, current - 1);

        if (nextQty === 0) {
            await handleDelete();
            return;
        }

        await postManage({
            product_id: productId,
            quantity: nextQty,
            action: "update",
        });
    };

    const handleDelete = async () => {
        await postManage({
            product_id: productId,
            quantity: 0,
            action: "delete",
        });
    };

    return (
        <div className="cart-item border-subtle rounded-md shadow-2xs">
            <div className="cart-item__info">
                <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item__img"
                />
                <div className="cart-item__details">
                    <span className="cart-item__tag border-subtle rounded-full">
                        {item.category}
                    </span>
                    <p className="cart-item__name fs-label-text">{item.name}</p>
                </div>
            </div>

            <div className="d-flex flex-col items-end gap-y-2">
                <span className="fw-bold">
                    ${Number(item.price).toFixed(2)}
                </span>

                <div className="d-flex items-center gap-5">
                    <button
                        className="d-inline-flex"
                        onClick={handleDelete}
                        disabled={busy}
                        title="Remove"
                    >
                        <TrashIcon size={24} />
                    </button>

                    <div className="d-flex items-center gap-3">
                        <button
                            className="cart__quantity-btn bg-gray-700 text-white rounded-base d-inline-flex items-center justify-center"
                            onClick={decrement}
                            disabled={busy}
                            aria-label="Decrease"
                        >
                            <MinusIcon />
                        </button>

                        <span className="cart__quantity-value">
                            {item.quantity ?? 1}
                        </span>

                        <button
                            className="cart__quantity-btn bg-gray-700 text-white rounded-base d-inline-flex items-center justify-center"
                            onClick={increment}
                            disabled={busy}
                            aria-label="Increase"
                        >
                            <PlusIcon />
                        </button>
                    </div>
                </div>

                {error && <div className="error small mt-1">{error}</div>}
            </div>
        </div>
    );
}
