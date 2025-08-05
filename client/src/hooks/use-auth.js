import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/store/slices/auth-slice";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";

export default function useAuth() {
    const dispatch = useDispatch();
    // granular selectors are less prone to cause unnecessary re-renders
    const [isLoading, setisLoading] = useState(true);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);

    const isAdmin = useMemo(
        () => isLoggedIn && user.role === "admin",
        [isLoggedIn, user],
    );

    // Init state
    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        const user = JSON.parse(localStorage.getItem(USER_KEY));

        if (token && user) {
            const payload = { ...user, token };
            dispatch(login(payload));
        }
        setisLoading(false);
    }, [dispatch]);

    useEffect(() => {
        // sync localStorage on auth change
        if (isLoggedIn) {
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        }
    }, [isLoggedIn, token, user]);

    const signIn = payload => dispatch(login(payload));
    const signOut = () => dispatch(logout());

    return { isLoggedIn, isLoading, isAdmin, user, token, signIn, signOut };
}
