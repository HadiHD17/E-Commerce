import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import React, { useState } from "react";

export default function NavbarSearch() {
    const [search, setSearch] = useState("");

    const handleSearch = e => {
        e.preventDefault();
        // Add your search logic here
        // Example: navigate(`/search?query=${search}`);
    };

    return (
        <form className="navbar-search" onSubmit={handleSearch}>
            <input
                id="search"
                name="search"
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="navbar-search__input"
            />
            <button className="navbar-search__button">
                <MagnifyingGlassIcon size={24} />
            </button>
        </form>
    );
}
