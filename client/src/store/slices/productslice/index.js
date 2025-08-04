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
    allCategories: [],
    searchQuery: "",
    currentPage: 1,
    selectedProduct: null,
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        loadProducts: (state, action) => {
            return {
                ...state,
                list: action.payload,
                filtered: action.payload,
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
            state.filters = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
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
        setCategories: (state, action) => {
            state.allCategories = action.payload;
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
});
