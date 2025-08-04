import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/productslice";
import authReducer from "./slices/auth-slice";

export default configureStore({
    reducer: {
        products: productsSlice.reducer,
        auth: authReducer,
    },
});
