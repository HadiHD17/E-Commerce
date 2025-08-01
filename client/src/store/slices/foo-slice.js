import { createSlice } from "@reduxjs/toolkit";

/* A redux slice with reducers, for demonstration purposes */
export const fooSlice = createSlice({
    name: "foo",
    initialState: {
        value: "",
    },
    reducers: {
        setFoo: state => {
            state.value = "foo";
        },
        unsetFoo: state => {
            state.value = "";
        },
    },
});

export const { setFoo, unsetFoo } = fooSlice.actions;

const fooReducer = fooSlice.reducer;
export default fooReducer;
