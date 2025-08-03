import Pagination from "@/components/shared/pagination";
import ProductCard from "@/components/shared/product-card";
import FilterSidebar from "@/components/filter-sidebar";
import React, { useEffect, useState } from "react";
import "./products-search.css";

export default function ProductsSearchPage() {
    const [filters, setFilters] = useState({ categories: [], sort: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Wireless Headphones",
            img: "https://via.placeholder.com/150x150?text=Headphones",
            price: 120,
            newPrice: 99,
            stock: 15,
            category: "Electronics",
        },
        {
            id: 2,
            name: "Running Shoes",
            img: "https://via.placeholder.com/150x150?text=Shoes",
            price: 80,
            newPrice: null,
            stock: 5,
            category: "Fashion",
        },
        {
            id: 3,
            name: "Smart Watch",
            img: "https://via.placeholder.com/150x150?text=Watch",
            price: 200,
            newPrice: 150,
            stock: 0,
            category: "Gadgets",
        },
    ]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", searchQuery, "with filters:", filters);
    };
    useEffect(() => {
        handleSearch();
    }, [filters, searchQuery, currentPage]);
    return (
        <div>
            <div className="products-search-container">
                <div className="products-sidebar">
                    <FilterSidebar filters={filters} setFilters={setFilters} />
                </div>
                <div className="products-list">
                    {products.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}
