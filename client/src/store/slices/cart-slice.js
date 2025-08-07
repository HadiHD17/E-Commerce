// src/store/slices/cart-slice.js
import { createSlice } from "@reduxjs/toolkit";

/**
 * Cart item shape (example):
 * {
 *   product_id: number|string,
 *   name: string,
 *   price: number|string,
 *   quantity: number,
 *   image_url?: string,
 *   category?: string
 * }
 */

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        list: [], // array of cart items
        filter: "all", // keep for parity with orders; you can use later (e.g., "in-stock", etc.)
    },
    reducers: {
        // Replace the whole cart list (e.g., after GET /customer/cart)
        setCart(state, action) {
            state.list = Array.isArray(action.payload) ? action.payload : [];
        },

        // Optional: set a filter (kept to mirror your orders slice)
        setFilter(state, action) {
            state.filter = action.payload;
        },

        // Clear all items
        clearCart(state) {
            state.list = [];
        },

        // Add or update a single cart item (idempotent upsert)
        upsertItem(state, action) {
            const item = action.payload;
            if (!item) return;

            const pid = item.product_id ?? item.id; // allow either shape
            const idx = state.list.findIndex(
                it => (it.product_id ?? it.id) === pid,
            );

            if (idx >= 0) {
                // merge existing + incoming
                state.list[idx] = { ...state.list[idx], ...item };
            } else {
                state.list.push({ ...item });
            }
        },

        // Update quantity for a product_id
        updateQuantity(state, action) {
            const { product_id, quantity } = action.payload || {};
            const pid = product_id;
            if (pid == null) return;

            const idx = state.list.findIndex(
                it => (it.product_id ?? it.id) === pid,
            );
            if (idx < 0) return;

            const nextQty = Number(quantity);
            if (Number.isNaN(nextQty) || nextQty < 0) return;

            if (nextQty === 0) {
                // remove if quantity set to 0
                state.list.splice(idx, 1);
            } else {
                state.list[idx].quantity = nextQty;
            }
        },

        // Remove an item by product_id
        removeItem(state, action) {
            const product_id = action.payload;
            state.list = state.list.filter(
                it => (it.product_id ?? it.id) !== product_id,
            );
        },
    },
});

export const {
    setCart,
    setFilter,
    clearCart,
    upsertItem,
    updateQuantity,
    removeItem,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;

// ------- Optional selectors (simple helpers) -------
export const selectCartItems = state => state.cart.list;
export const selectCartCount = state =>
    state.cart.list.reduce((sum, it) => sum + Number(it.quantity || 1), 0);
export const selectCartSubtotal = state =>
    state.cart.list.reduce(
        (sum, it) => sum + Number(it.price) * Number(it.quantity || 1),
        0,
    );
