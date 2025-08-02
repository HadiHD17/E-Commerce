import React from "react";
import "./cart.css";
import Button from "@/components/shared/button";
import CartItem from "@/components/cart-item";

const cartItems = [
    {
        id: 1,
        name: "Apple MacBook Air 15” (2023) - Space Grey",
        price: 1500,
        category: "Laptop",
        image: "https://placehold.co/100x70?text=Laptop",
    },
    {
        id: 2,
        name: "Nikon A4331",
        price: 1500,
        category: "Camera",
        image: "https://placehold.co/100x70?text=Camera",
    },
    {
        id: 3,
        name: "Apple MacBook Air 15” w/ Touch ID (2023) - Space Grey",
        price: 1500,
        category: "Laptop",
        image: "https://placehold.co/100x70?text=Controller",
    },
    {
        id: 4,
        name: "Apple Watch Ultra 2 (2024)",
        price: 500,
        category: "Watch",
        image: "https://placehold.co/100x70?text=Watch",
    },
];

export default function CartPage() {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const discount = 19;
    const shipping = 10;
    const tax = 15;
    const total = subtotal - discount + shipping + tax;

    return (
        <div className="cart container">
            <div className="cart__left">
                <h2 className="cart__title fs-h1">My Cart</h2>

                <div className="d-grid gap-y-4">
                    {cartItems.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
            </div>

            <div className="cart__summary">
                <h3 className="cart__summary-title fs-h2">Order Summary</h3>

                <div className="cart__summary-body d-flex flex-col gap-y-3 bg-gray-100 border-subtle shadow-2xs rounded-md">
                    <p className="d-flex justify-between">
                        <span>Subtotal</span> <span>${subtotal}</span>
                    </p>
                    <p className="d-flex justify-between">
                        <span>Discount</span> <span>-${discount}</span>
                    </p>
                    <p className="d-flex justify-between">
                        <span>Shipping</span> <span>${shipping}</span>
                    </p>
                    <p className="text-gray-500 d-flex justify-between">
                        <span>Tax</span> <span>${tax}</span>
                    </p>

                    <div className="cart__summary-divider" />

                    <p className="cart__summary-total fw-bold d-flex justify-between">
                        <span>Total</span> <span>${total}</span>
                    </p>

                    <Button color="brand">Proceed to Checkout</Button>
                </div>
            </div>
        </div>
    );
}
