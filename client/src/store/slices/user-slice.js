import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: null,
    successMessage: null,
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser(state, action) {
            state.data = action.payload;
            state.error = null;
            state.successMessage = null;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.successMessage = null;
        },
        setSuccessMessage(state, action) {
            state.successMessage = action.payload;
            state.loading = false;
            state.error = null;
        },
        clearMessages(state) {
            state.error = null;
            state.successMessage = null;
        },
    },
});

export const {
    setUser,
    setLoading,
    setError,
    setSuccessMessage,
    clearMessages,
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
