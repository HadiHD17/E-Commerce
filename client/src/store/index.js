import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/products-slice";
import authReducer from "./slices/auth-slice";
import ordersReducer from "./slices/orders-slice";
import userReducer from "./slices/user-slice";
import cartReducer from "./slices/cart-slice";

export default configureStore({
    reducer: {
        products: productsReducer,
        orders: ordersReducer,
        auth: authReducer,
        user: userReducer,
        cart: cartReducer,
    },
});
