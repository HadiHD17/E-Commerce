import Input from "@/components/shared/input";
import Button from "@/components/shared/button";
import "./checkout.css";

export default function CheckoutPage() {
    function handleSubmit(e) {
        e.preventDefault();
        // form submit logic here...
    }

    return (
        <div className="checkout-page container">
            <form className="checkout-page__outline" onSubmit={handleSubmit}>
                <section className="checkout-page__section">
                    <h2 className="checkout-page__heading fs-h2">
                        Contact and Shipping
                    </h2>

                    <fieldset className="checkout-page__fieldset">
                        <Input
                            id="name"
                            label="Full Name"
                            type="text"
                            required
                        />
                        <Input id="email" label="Email" type="email" required />
                        <Input
                            id="street-address"
                            label="Street Address"
                            type="text"
                            required
                        />
                        <div className="checkout-page__inputs-row">
                            <Input
                                id="city"
                                label="City"
                                type="text"
                                rootClassname="flex-1"
                                required
                            />
                            <Input
                                id="country"
                                label="Country"
                                type="text"
                                rootClassname="flex-1"
                                required
                            />
                            <Input
                                id="zip-code"
                                label="ZIP Code"
                                type="text"
                                rootClassname="flex-1"
                                required
                            />
                        </div>
                    </fieldset>
                </section>
                <section className="checkout-page__section">
                    <h2 className="checkout-page__heading fs-h2">Payment</h2>

                    <fieldset className="checkout-page__fieldset">
                        <Input
                            label="Cardholder Name"
                            id="cardholder-name"
                            type="text"
                            placeholder="John M. Doe"
                        />
                        <Input
                            label="Card Number"
                            id="card-number"
                            type="text"
                            inputMode="numeric"
                            minLength={13}
                            maxLength={19}
                            placeholder="1234 5678 9012 3456"
                        />
                        <div className="checkout-page__inputs-row">
                            <Input
                                label="Expiry Date"
                                id="expiry-date"
                                type="date"
                                placeholder="MM/YY"
                                rootClassname="flex-1"
                            />
                            <Input
                                label="CVV"
                                id="cvv"
                                type="password"
                                minLength={1}
                                maxLength={4}
                                max={9999}
                                placeholder="3-4 digit code"
                                rootClassname="flex-1"
                            />
                        </div>
                    </fieldset>
                </section>

                <section className="checkout-page__section">
                    <h2 className="checkout-page__heading fs-h2">
                        Order Summary
                    </h2>
                    <div className="d-flex justify-between gap-2">
                        <span>Cotton T-Shirt &times; 2</span>
                        <span>$59.98</span>
                    </div>
                    <div className="d-flex justify-between gap-2">
                        <span>Running Shoes &times; 1</span>
                        <span>$89.99</span>
                    </div>
                    <div className="d-flex justify-between gap-2">
                        <span>Backpack &times; 1</span>
                        <span>$45.00</span>
                    </div>

                    <div className="checkout-page__divider" />

                    <div className="order-summary__totals">
                        <div className="d-flex justify-between gap-2">
                            <span>Subtotal</span>
                            <span>$194.97</span>
                        </div>
                        <div className="d-flex justify-between gap-2">
                            <span>Shipping</span>
                            <span>$8.99</span>
                        </div>
                        <div className="d-flex justify-between gap-2">
                            <span>Tax</span>
                            <span>$16.32</span>
                        </div>

                        <div className="checkout-page__divider" />

                        <div className="d-flex justify-between gap-2 fw-bold">
                            <span>Total</span>
                            <span>$220.28</span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        color="brand"
                        className="checkout-page__submit-button"
                    >
                        Place Order
                    </Button>
                </section>
            </form>
        </div>
    );
}
