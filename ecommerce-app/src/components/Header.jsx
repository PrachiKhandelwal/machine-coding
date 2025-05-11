import React, { useState } from "react";
import { IconContext } from "react-icons";
import { IoIosSearch } from "react-icons/io";
import { useProducts } from "../context/ProductsProvider";

const Header = () => {
    const { filters, dispatchFilters } = useProducts();
    const searchHandler = (e) => {
        dispatchFilters({type:"APPLY_SEARCH_QUERY" , payload:e.target.value});
    };
    return (
        <header className="header">
            <h3>That Random Store</h3>
            <form>
                <input value={filters.searchQuery} onChange={searchHandler} />
                <IconContext.Provider value={{color:'grey'}}><IoIosSearch /></IconContext.Provider>
            </form>
        </header>
    );
};

export default Header;
