import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/productslice";

export default configureStore({
    reducer: {
        products: productsSlice.reducer,
    },
});
