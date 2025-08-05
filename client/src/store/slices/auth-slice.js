import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { id, name, email, phone, token } = action.payload || {};
            if (id && name && email && phone && token) {
                state.isLoggedIn = true;
                state.user = { id, name, email, phone };
                state.token = token;
            }
        },

        logout: state => {
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
