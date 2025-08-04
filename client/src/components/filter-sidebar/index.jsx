import React from "react";
import "./filtersidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "@/store/slices/productslice";

export default function FilterSidebar() {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.products.filters || {});
    const categories = useSelector(state => state.products.allCategories || []);
    const selectedCategories = filters.categories || [];

    const handleCategoryChange = category => {
        dispatch(productsSlice.actions.toggleCategory(category));
    };
    const handleSortChange = sortOrder => {
        dispatch(productsSlice.actions.setSortOrder(sortOrder));
    };
    return (
        <aside className="filter-sidebar">
            <section>
                <h3>Categories</h3>
                {categories.map(cat => (
                    <label key={cat}>
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => handleCategoryChange(cat)}
                        />
                        {cat}
                    </label>
                ))}
            </section>
            <section>
                <h3>Price</h3>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="desc"
                        checked={filters.sort === "desc"}
                        onChange={() => handleSortChange("desc")}
                    />
                    High to Low
                </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="asc"
                        checked={filters.sort === "asc"}
                        onChange={() => handleSortChange("asc")}
                    />
                    Low to High
                </label>
            </section>
        </aside>
    );
}
