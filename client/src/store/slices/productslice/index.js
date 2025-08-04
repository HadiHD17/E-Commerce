import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    filtered: [],
    loading: false,
    error: null,
    filters: {
        categories: [],
        sort: "asc",
    },
    searchQuery: "",
    currentPage: 1,
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        loadProducts: (state, action) => {
            return {
                ...state,
                list: action.payload,
                filtered: action.payload, // optional for filtered use
                loading: false,
                error: null,
            };
        },
        emptyProducts: state => {
            return {
                ...state,
                list: [],
            };
        },
        setFilters: (state, action) => {
            return {
                ...state,
                filters: action.payload,
            };
        },
        setSearchQuery: (state, action) => {
            return {
                ...state,
                searchQuery: action.payload,
            };
        },
        setCurrentPage: (state, action) => {
            return {
                ...state,
                currentPage: action.payload,
            };
        },
        setLoading: (state, action) => {
            return {
                ...state,
                loading: action.payload,
            };
        },
        setError: (state, action) => {
            return {
                ...state,
                error: action.payload,
            };
        },
        toggleCategory: (state, action) => {
            const category = action.payload;
            if (state.filters.categories.includes(category)) {
                state.filters.categories = state.filters.categories.filter(
                    c => c !== category,
                );
            } else {
                state.filters.categories.push(category);
            }
        },
        setSortOrder: (state, action) => {
            state.filters.sort = action.payload;
        },
        setAvailableCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
});
