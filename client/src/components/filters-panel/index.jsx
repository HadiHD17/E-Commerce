import React from "react";
import "./FiltersPanel.css";

export default function FiltersPanel() {
    return (
        <div className="filters-panel">
            <div className="filters-header">
                <h4>Filters</h4>
                <button className="clear-btn">Clear filters</button>
            </div>

            <div className="filter-section">
                <h5>Categories</h5>
                <label>
                    <input type="checkbox" /> Home Appliances
                </label>
                <label>
                    <input type="checkbox" /> Smartphones
                </label>
                <label>
                    <input type="checkbox" checked /> Computers
                </label>
                <label>
                    <input type="checkbox" checked /> Gadgets
                </label>
                <label>
                    <input type="checkbox" /> Accessories
                </label>
            </div>

            <div className="filter-section">
                <h5>Price</h5>
                <input type="range" min="40" max="1050" />
            </div>

            <div className="filter-section">
                <h5>Stock Status</h5>
                <label>
                    <input type="checkbox" checked /> In-stock
                </label>
                <label>
                    <input type="checkbox" /> Out of stock
                </label>
            </div>

            <div className="filter-section">
                <h5>Sort By Price</h5>
                <label>
                    <input type="radio" name="sort" /> Low to high
                </label>
                <label>
                    <input type="radio" name="sort" checked /> High to low
                </label>
            </div>
        </div>
    );
}
