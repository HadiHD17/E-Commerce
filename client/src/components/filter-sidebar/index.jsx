import React from "react";
import "./filtersidebar.css";

export default function FilterSidebar({ filters, setFilters }) {
    const categories = [
        "Laptop",
        "Accessories",
        "Smart Phone",
        "Camera",
        "Smart Watch",
        "Gaming",
    ];
    const handleCategoryChange = category => {
        const isSelected = filters.categories.includes(category);
        const newCategories = isSelected
            ? filters.categories.filter(cat => cat !== category)
            : [...filters.categories, category];
        setFilters({ ...filters, categories: newCategories });
    };
    const handleSortChange = sortOrder => {
        setFilters({ ...filters, sort: sortOrder });
    };
    return (
        <aside className="filter-sidebar">
            <section>
                <h3>Categories</h3>
                {categories.map(cat => (
                    <label key={cat}>
                        <input
                            type="checkbox"
                            checked={filters.categories.includes(cat)}
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
