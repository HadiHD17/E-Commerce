import React, { useMemo } from "react";
import "./filtersidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "@/store/slices/products-slice";

export default function FilterSidebar() {
    const dispatch = useDispatch();

    const { filters, allCategories } = useSelector(state => ({
        filters: state.products.filters || {},
        allCategories: state.products.allCategories || [],
    }));

    const selectedCategories = filters.categories || [];

    // Normalize categories to { key, label, value }
    // Supports:
    // - ["Books", "Electronics"]
    // - [{ id: 1, name: "Books" }, { id: 2, name: "Electronics" }]
    const normalizedCategories = useMemo(() => {
        return (allCategories || []).map((cat, idx) => {
            if (typeof cat === "string") {
                return { key: cat, label: cat, value: cat };
            }
            const label = cat?.name ?? cat?.title ?? String(cat?.id ?? idx);
            return {
                key: cat?.id ?? label ?? idx,
                label,
                value: label, // we filter by category name string
            };
        });
    }, [allCategories]);

    const handleCategoryChange = value => {
        // toggleCategory expects a string category in your slice
        dispatch(productsSlice.actions.toggleCategory(value));
        // Optionally, reset to page 1 when filters change:
        // dispatch(productsSlice.actions.setCurrentPage(1));
    };

    const handleSortChange = sortOrder => {
        dispatch(productsSlice.actions.setSortOrder(sortOrder));
        // dispatch(productsSlice.actions.setCurrentPage(1));
    };

    const isChecked = value => selectedCategories.includes(value);

    return (
        <aside className="filter-sidebar">
            <section>
                <h3>Categories</h3>

                {normalizedCategories.length === 0 ? (
                    <div className="muted">No categories found.</div>
                ) : (
                    <div className="category-list">
                        {normalizedCategories.map(c => (
                            <label key={c.key} className="category-item">
                                <input
                                    type="checkbox"
                                    checked={isChecked(c.value)}
                                    onChange={() =>
                                        handleCategoryChange(c.value)
                                    }
                                />
                                <span>{c.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h3>Price</h3>
                <label className="sort-item">
                    <input
                        type="radio"
                        name="sort"
                        value="desc"
                        checked={filters.sort === "desc"}
                        onChange={() => handleSortChange("desc")}
                    />
                    <span>High to Low</span>
                </label>
                <label className="sort-item">
                    <input
                        type="radio"
                        name="sort"
                        value="asc"
                        checked={filters.sort === "asc"}
                        onChange={() => handleSortChange("asc")}
                    />
                    <span>Low to High</span>
                </label>
            </section>
        </aside>
    );
}
