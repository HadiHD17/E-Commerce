import Pagination from "@/components/shared/pagination";
import ProductCard from "@/components/shared/product-card";
import FilterSidebar from "@/components/filter-sidebar";
import React, { useEffect, useState } from "react";
import "./products-search.css";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "@/store/slices/productslice";
import axios from "axios";

export default function ProductsSearchPage() {
    const productsState = useSelector(global => global.products);
    const dispatch = useDispatch();
    const {
        list: products,
        loading,
        error,
        filters,
        searchQuery,
        currentPage,
    } = productsState;

    const PRODUCTS_PER_PAGE = 6;

    const fetchProducts = async () => {
        dispatch(productsSlice.actions.setLoading(true));
        dispatch(productsSlice.actions.setError(null));
        try {
            let url = `http://localhost:8000/api/v0.1/customer/products`;

            if (searchQuery) {
                url = `http://localhost:8000/api/v0.1/customer/products_by_search?searchTerm=${searchQuery}`;
            } else if (filters.category) {
                url = `http://localhost:8000/api/v0.1/customer/products_by_category?category=${filters.category}`;
            }

            const res = await axios.get(url, {
                headers: {
                    Authorization: `Beaer ${localStorage.getItem("token")}`,
                },
            });

            const products = res.data.payload;

            if (filters.sort === "asc") {
                products.sort((a, b) => a.price - b.price);
            } else if (filters.sort === "desc") {
                products.sort((a, b) => b.price - a.price);
            }
            dispatch(productsSlice.actions.loadProducts(products));
        } catch (error) {
            dispatch(productsSlice.actions.setError("failed to load products"));
        } finally {
            dispatch(productsSlice.actions.setLoading(false));
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters, searchQuery, currentPage]);

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = products.slice(
        startIndex,
        startIndex + PRODUCTS_PER_PAGE,
    );
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    return (
        <div>
            <div className="products-search-container">
                <div className="products-sidebar">
                    <FilterSidebar
                        filters={filters}
                        setFilters={newFilters =>
                            dispatch(
                                productsSlice.actions.setFilters(newFilters),
                            )
                        }
                        searchQuery={searchQuery}
                        setSearchQuery={query =>
                            dispatch(
                                productsSlice.actions.setSearchQuery(query),
                            )
                        }
                    />
                </div>
                <div className="products-list">
                    {paginatedProducts.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={page =>
                    dispatch(productsSlice.actions.setCurrentPage(page))
                }
                totalPages={totalPages}
            />
        </div>
    );
}
