import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/components/shared/pagination";
import ProductCard from "@/components/shared/product-card";
import FilterSidebar from "@/components/filter-sidebar";
import "./products-search.css";
import api from "@/api";
import { productsSlice } from "@/store/slices/products-slice";

export default function ProductsSearchPage() {
    const dispatch = useDispatch();
    const {
        list: products,
        loading,
        error,
        filters,
        searchQuery,
        currentPage,
        allCategories,
    } = useSelector(s => s.products);

    const PRODUCTS_PER_PAGE = 8;

    const getCategories = async () => {
        try {
            const res = await api.get("/common/categories", {
                headers: { Accept: "application/json" },
            });
            const list = res.data?.payload ?? [];
            dispatch(productsSlice.actions.setCategories(list));
            return list;
        } catch (err) {
            console.error(
                "Error fetching categories:",
                err?.response?.data || err,
            );
            dispatch(productsSlice.actions.setCategories([]));
            return [];
        }
    };

    const fetchProducts = async () => {
        dispatch(productsSlice.actions.setLoading(true));
        dispatch(productsSlice.actions.setError(null));

        await getCategories();

        const token = localStorage.getItem("auth-token");
        if (!token) {
            dispatch(
                productsSlice.actions.setError(
                    "You must be logged in to view products.",
                ),
            );
            dispatch(productsSlice.actions.setLoading(false));
            return;
        }

        try {
            let url = "customer/products";

            if (searchQuery?.trim()) {
                url = `customer/products_by_search?searchTerm=${encodeURIComponent(searchQuery.trim())}`;
            } else if (filters.categories && filters.categories.length > 0) {
                const selectedCat = filters.categories[0];
                url = `customer/products_by_category/${encodeURIComponent(selectedCat)}`;
            }

            const res = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            const items = Array.isArray(res.data?.payload)
                ? res.data.payload
                : [];

            if (filters.sort === "asc") {
                items.sort((a, b) => Number(a.price) - Number(b.price));
            } else if (filters.sort === "desc") {
                items.sort((a, b) => Number(b.price) - Number(a.price));
            }

            dispatch(productsSlice.actions.loadProducts(items));
        } catch (err) {
            console.error(
                "Error fetching products:",
                err?.response?.data || err,
            );
            dispatch(productsSlice.actions.setError("Failed to load products"));
        } finally {
            dispatch(productsSlice.actions.setLoading(false));
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters, searchQuery, currentPage]);

    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE)),
        [products.length],
    );

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = useMemo(
        () => products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE),
        [products, startIndex],
    );

    return (
        <div>
            <div className="products-search-container">
                <div className="products-sidebar">
                    <FilterSidebar
                        categories={allCategories}
                        filters={filters}
                        setFilters={newFilters =>
                            dispatch(
                                productsSlice.actions.setFilters({
                                    ...filters,
                                    ...newFilters,
                                }),
                            )
                        }
                        searchQuery={searchQuery}
                        setSearchQuery={q =>
                            dispatch(productsSlice.actions.setSearchQuery(q))
                        }
                    />
                </div>

                <div className="products-search__list products-grid">
                    {loading && <div className="info">Loading products…</div>}
                    {error && !loading && <div className="error">{error}</div>}
                    {!loading && !error && paginatedProducts.length === 0 && (
                        <div className="info">No products found.</div>
                    )}

                    {!loading &&
                        !error &&
                        paginatedProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                img={product.image?.[0]?.image_url}
                                {...product}
                            />
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
