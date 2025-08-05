import React, { useEffect } from "react";
import "./cart.css";
import Button from "@/components/shared/button";
import CartItem from "@/components/cart-item";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCart, clearCart } from "@/store/slices/cart-slice";
import api from "@/api";

export default function CartPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.list || []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("auth-token");
            const res = await api.get("customer/cart_items", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            const list = Array.isArray(res.data?.payload)
                ? res.data.payload
                : [];
            dispatch(setCart(list));
        } catch (error) {
            console.error(
                "Failed to fetch cart:",
                error?.response?.data || error,
            );
            dispatch(setCart([]));
        }
    };

    useEffect(() => {
        fetchCart();
        return () => dispatch(clearCart());
    }, []);

    const subtotal = items.reduce((acc, row) => {
        const price = Number(row?.product?.price) || 0;
        const qty = Number(row?.quantity || 1);
        return acc + price * qty;
    }, 0);
    const discount = 19;
    const shipping = 10;
    const tax = 15;
    const total = subtotal - discount + shipping + tax;

    return (
        <div className="cart container">
            <div className="cart__left">
                <h2 className="cart__title fs-h1">My Cart</h2>

                <div className="d-grid gap-y-4">
                    {items.length === 0 ? (
                        <div className="muted">Your cart is empty.</div>
                    ) : (
                        items.map(row => {
                            const p = row.product || {};
                            return (
                                <CartItem
                                    key={row.id}
                                    item={{
                                        id: p.id,
                                        name: p.name,
                                        price: Number(p.price),
                                        category: p.category,
                                        image:
                                            p.image?.[0]?.image_url ||
                                            p.image_url ||
                                            "https://placehold.co/100x70?text=Item",
                                        quantity: Number(row.quantity || 1),
                                    }}
                                    onChanged={fetchCart}
                                />
                            );
                        })
                    )}
                </div>
            </div>

            <div className="cart__summary">
                <h3 className="cart__summary-title fs-h2">Order Summary</h3>

                <div className="cart__summary-body d-flex flex-col gap-y-3 bg-gray-100 border-subtle shadow-2xs rounded-md">
                    <p className="d-flex justify-between">
                        <span>Subtotal</span>{" "}
                        <span>${subtotal.toFixed(2)}</span>
                    </p>
                    <p className="d-flex justify-between">
                        <span>Discount</span>{" "}
                        <span>-${discount.toFixed(2)}</span>
                    </p>
                    <p className="d-flex justify-between">
                        <span>Shipping</span>{" "}
                        <span>${shipping.toFixed(2)}</span>
                    </p>
                    <p className="text-gray-500 d-flex justify-between">
                        <span>Tax</span> <span>${tax.toFixed(2)}</span>
                    </p>

                    <div className="cart__summary-divider" />

                    <p className="cart__summary-total fw-bold d-flex justify-between">
                        <span>Total</span> <span>${total.toFixed(2)}</span>
                    </p>

                    <Button
                        color="brand"
                        onClick={() => navigate("/checkout")}
                        disabled={items.length === 0}
                    >
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}
