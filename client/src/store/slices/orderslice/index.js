import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        list: [],
        filter: "all",
    },
    reducers: {
        setOrders(state, action) {
            state.list = action.payload;
        },
        setFilter(state, action) {
            state.filter = action.payload;
        },
        clearOrders(state) {
            state.list = [];
        },
    },
});

const ordersReducer = ordersSlice.reducer;
export default ordersReducer;
