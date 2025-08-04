import React from "react";
import "./pagination.css";

export default function Pagination({ currentPage, setCurrentPage }) {
    const pages = Array.from({ length: 10 }, (_, i) => i + 1); // Example: 10 pages

    const handlePageChange = page => {
        setCurrentPage(page);
    };
    return (
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {pages.map(page => (
                <button key={page} onClick={() => handlePageChange(page)}>
                    {page}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pages.length}
            >
                Next
            </button>
        </div>
    );
}
