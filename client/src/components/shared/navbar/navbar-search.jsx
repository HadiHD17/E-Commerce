import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { productsSlice } from "@/store/slices/productslice";
import { useNavigate } from "react-router-dom";

export default function NavbarSearch() {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSearchChange(e) {
        setSearch(e.target.value);
        dispatch(productsSlice.actions.setSearchQuery(e.target.value));
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate("/search");
    }

    return (
        <form className="navbar-search" onSubmit={handleSubmit}>
            <input
                id="search"
                name="search"
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="navbar-search__input"
            />
            <button className="navbar-search__button">
                <MagnifyingGlassIcon size={24} />
            </button>
        </form>
    );
}
