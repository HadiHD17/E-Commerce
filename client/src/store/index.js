import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/productslice";
import { orderSlice } from "./slices/orderslice";
import { userSlice } from "./slices/userslice";

export default configureStore({
    reducer: {
        products: productsSlice.reducer,
        orders: orderSlice.reducer,
        users: userSlice.reducer,
    },
});
