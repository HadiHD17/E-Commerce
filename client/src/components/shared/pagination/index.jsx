import React from "react";
import "./pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "@/store/slices/productslice";

export default function Pagination({ totalPages }) {
    const currentPage = useSelector(state => state.products.currentPage);
    const dispatch = useDispatch();
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const handlePageChange = page => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            dispatch(productsSlice.actions.setCurrentPage(page));
        }
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
