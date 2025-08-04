import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/productslice";

import authReducer from "./slices/auth-slice";

import { orderSlice } from "./slices/orderslice";
import { userSlice } from "./slices/userslice";


export default configureStore({
    reducer: {
        products: productsSlice.reducer,

        auth: authReducer,

        orders: orderSlice.reducer,
        users: userSlice.reducer,

    },
});
