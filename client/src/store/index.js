import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/productslice";
import { orderSlice } from "./slices/orderslice";

export default configureStore({
    reducer: {
        products: productsSlice.reducer,
        orders: orderSlice.reducer,
    },
});
