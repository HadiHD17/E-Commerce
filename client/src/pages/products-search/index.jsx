import Pagination from "@/components/shared/pagination";
import ProductCard from "@/components/shared/product-card";
import FilterSidebar from "@/components/filter-sidebar";
import { useEffect } from "react";
import "./products-search.css";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "@/store/slices/products-slice";
import api from "@/api";

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

    const PRODUCTS_PER_PAGE = 8;

    const fetchProducts = async () => {
        dispatch(productsSlice.actions.setLoading(true));
        dispatch(productsSlice.actions.setError(null));

        const token = localStorage.getItem("auth-token");
        console.log(token);
        try {
            let url = `customer/products`;

            if (searchQuery) {
                url = `customer/products_by_search?searchTerm=${searchQuery}`;
            } else if (filters.categories && filters.categories.length > 0) {
                const category = filters.categories[0];
                url = `customer/products_by_category/${encodeURIComponent(category)}`;
            }

            const res = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            const products = res.data.payload;

            const uniqueCategories = [
                ...new Set(products.map(p => p.category)),
            ];
            dispatch(productsSlice.actions.setCategories(uniqueCategories));

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
