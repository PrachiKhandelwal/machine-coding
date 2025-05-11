import React, { useEffect } from "react";
import { useProducts } from "../context/ProductsProvider";
import { useSearchParams } from "react-router";

const filterMap={
      sortByPrice: "SORT_BY_PRICE",
    applyOutOfStock:"APPLY_OUT_OF_STOCK_PRODUCTS",
    minRating: "APPLY_MINIMUM_RATING",
    searchQuery: "APPLY_SEARCH_QUERY",
}

const Filter = () => {
    const { filters, dispatchFilters } = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();
    const priceSortHandler = (val) => {
        dispatchFilters({ type: "SORT_BY_PRICE", payload: val });
    };
    const outOfStockHandler = (e) => {
        dispatchFilters({
            type: "APPLY_OUT_OF_STOCK_PRODUCTS",
            payload: e.target.checked,
        });
    };
    const ratingHandler = (e) => {
        dispatchFilters({
            type: "APPLY_MINIMUM_RATING",
            payload: e.target.value,
        });
    };
    const clearFiltersHandler = () => {
        dispatchFilters({
            type: "CLEAR_FILTERS",
        });
    };
    useEffect(() => {
       setSearchParams(filters);
    }, [filters]);
    useEffect(()=>{
        if(searchParams.size){
            searchParams.forEach((val,key)=>{
                dispatchFilters({type:filterMap[key],payload:val})
            })
        }
    },[searchParams])
    console.log("search params", searchParams);
    return (
        <div>
            <p>Sort By Price</p>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginRight: "1rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <label htmlFor="ascending">Ascending</label>
                    <input
                        type="radio"
                        id="ascending"
                        name="sort-by-price"
                        value="asc"
                        checked={filters.sortByPrice === "asc"}
                        onChange={() => priceSortHandler("asc")}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <label htmlFor="descending">Descending</label>
                    <input
                        type="radio"
                        id="descending"
                        name="sort-by-price"
                        value="desc"
                        checked={filters.sortByPrice === "desc"}
                        onChange={() => priceSortHandler("desc")}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <label htmlFor="include-out-of-stock">
                        Include out of stock
                    </label>
                    <input
                        id="include-out-of-stock"
                        type="checkbox"
                        checked={filters.applyOutOfStock}
                        onChange={outOfStockHandler}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <label htmlFor="minimum-rating">Minimum Rating</label>
                    <input
                        id="minimum-rating"
                        type="number"
                        value={filters.minRating}
                        onChange={ratingHandler}
                        min={0}
                        max={5}
                    />
                </div>
                <button onClick={clearFiltersHandler}>Clear Filters</button>
            </div>
        </div>
    );
};

export default Filter;
