import { useEffect, useState } from "react";
import Input from "@/components/shared/input";
import Button from "@/components/shared/button";
import api from "@/api";
import "./checkout.css";

export default function CheckoutPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        country: "",
        zip: "",
        cardholder_name: "",
        card_number: "",
        expiry_date: "",
        cvv: "",
    });

    const [cartItems, setCartItems] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    // Calculate totals in frontend
    const subtotal = cartItems.reduce(
        (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
        0,
    );
    const shipping = subtotal > 0 ? 8.99 : 0;
    const tax = subtotal * 0.084; // ~8.4%
    const total = subtotal + shipping + tax;

    const token = localStorage.getItem("auth-token");

    const fetchCart = async () => {
        try {
            setLoadingCart(true);
            const res = await api.get("/customer/cart_items", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const payload = Array.isArray(res?.data?.payload)
                ? res.data.payload
                : [];
            setCartItems(payload);
        } catch (e) {
            setError(e?.response?.data?.message || "Failed to load cart.");
            setCartItems([]);
        } finally {
            setLoadingCart(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleChange = e => {
        const { name, value, id } = e.target;
        const key = name || id;
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccessMsg(null);

        try {
            const res = await api.post(
                "/customer/checkout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setSuccessMsg(res?.data?.message || "Order placed successfully!");
            setForm({
                name: "",
                email: "",
                address: "",
                city: "",
                country: "",
                zip: "",
                cardholder_name: "",
                card_number: "",
                expiry_date: "",
                cvv: "",
            });
            setCartItems([]);
        } catch (e) {
            setError(
                e?.response?.data?.message ||
                    "An error occurred during checkout.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="checkout-page container">
            <form className="checkout-page__outline" onSubmit={handleSubmit}>
                {/* Contact and Shipping */}
                <section className="checkout-page__section">
                    <h2 className="checkout-page__heading fs-h2">
                        Contact and Shipping
                    </h2>
                    <fieldset className="checkout-page__fieldset">
                        <Input
                            id="name"
                            name="name"
                            label="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            id="address"
                            name="address"
                            label="Street Address"
                            value={form.address}
                            onChange={handleChange}
                            required
                        />
                        <div className="checkout-page__inputs-row">
                            <Input
                                id="city"
                                name="city"
                                label="City"
                                value={form.city}
                                onChange={handleChange}
                                rootClassname="flex-1"
                                required
                            />
                            <Input
                                id="country"
                                name="country"
                                label="Country"
                                value={form.country}
                                onChange={handleChange}
                                rootClassname="flex-1"
                                required
                            />
                            <Input
                                id="zip"
                                name="zip"
                                label="ZIP Code"
                                value={form.zip}
                                onChange={handleChange}
                                rootClassname="flex-1"
                                required
                            />
                        </div>
                    </fieldset>
                </section>

                {/* Payment */}
                <section className="checkout-page__section">
                    <h2 className="checkout-page__heading fs-h2">Payment</h2>
                    <fieldset className="checkout-page__fieldset">
                        <Input
                            id="cardholder_name"
                            name="cardholder_name"
                            label="Cardholder Name"
                            value={form.cardholder_name}
                            onChange={handleChange}
                            placeholder="John M. Doe"
                        />
                        <Input
                            id="card_number"
                            name="card_number"
                            label="Card Number"
                            inputMode="numeric"
                            minLength={13}
                            maxLength={19}
                            value={form.card_number}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                        />
                        <div className="checkout-page__inputs-row">
                            <Input
                                id="expiry_date"
                                name="expiry_date"
                                label="Expiry Date"
                                type="date"
                                value={form.expiry_date}
                                onChange={handleChange}
                                rootClassname="flex-1"
                            />
                            <Input
                                id="cvv"
                                name="cvv"
                                label="CVV"
                                type="password"
                                minLength={1}
                                maxLength={4}
                                value={form.cvv}
                                onChange={handleChange}
                                placeholder="3-4 digit code"
                                rootClassname="flex-1"
                            />
                        </div>
                    </fieldset>
                </section>

                {/* Order Summary */}
                <section className="checkout-page__section">
                    <h2 className="checkout-page__heading fs-h2">
                        Order Summary
                    </h2>

                    {loadingCart && <p>Loading cart...</p>}

                    {!loadingCart && cartItems.length > 0 && (
                        <>
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="d-flex justify-between gap-2"
                                >
                                    <span>
                                        {item.product.name} × {item.quantity}
                                    </span>
                                    <span>
                                        $
                                        {(
                                            parseFloat(item.product.price) *
                                            item.quantity
                                        ).toFixed(2)}
                                    </span>
                                </div>
                            ))}

                            <div className="checkout-page__divider" />

                            <div className="order-summary__totals">
                                <div className="d-flex justify-between gap-2">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-between gap-2">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-between gap-2">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>

                                <div className="checkout-page__divider" />

                                <div className="d-flex justify-between gap-2 fw-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </>
                    )}

                    {!loadingCart && cartItems.length === 0 && (
                        <p>Your cart is empty.</p>
                    )}

                    {error && <p className="error-text">{error}</p>}
                    {successMsg && <p className="success-text">{successMsg}</p>}

                    <Button
                        type="submit"
                        color="brand"
                        className="checkout-page__submit-button"
                        disabled={submitting || cartItems.length === 0}
                    >
                        {submitting ? "Processing..." : "Place Order"}
                    </Button>
                </section>
            </form>
        </div>
    );
}
