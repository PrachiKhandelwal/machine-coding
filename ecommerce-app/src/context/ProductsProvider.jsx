import { createContext, useContext, useEffect, useReducer } from "react";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

const initialState = {
    products: [],
    loading: false,
    error: "",
};

const initialFilterState = {
    sortByPrice: "",
    applyOutOfStock: false,
    minRating: 0,
    searchQuery: "",
};

const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const FETCH_PRODUCTS_SUCCEEDED = "FETCH_PRODUCTS_SUCCEEDED";
const FETCH_PRODUCTS_FAILED = "FETCH_PRODUCTS_FAILED";

const SORT_BY_PRICE = "SORT_BY_PRICE";
const APPLY_OUT_OF_STOCK_PRODUCTS = "APPLY_OUT_OF_STOCK_PRODUCTS";
const APPLY_MINIMUM_RATING = "APPLY_MINIMUM_RATING";
const APPLY_SEARCH_QUERY = "APPLY_SEARCH_QUERY";
const CLEAR_FILTERS = "CLEAR_FILTERS";

const productsReducer = (state, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state, loading: true };
        case FETCH_PRODUCTS_SUCCEEDED:
            return { loading: true, products: action.payload, error: "" };
        case FETCH_PRODUCTS_FAILED:
            return { loading: false, products: [], error: action.payload };
        default:
            return state;
    }
};

const filtersReducer = (state, action) => {
    switch (action.type) {
        case SORT_BY_PRICE:
            return { ...state, sortByPrice: action.payload };
        case APPLY_OUT_OF_STOCK_PRODUCTS:
            return { ...state, applyOutOfStock: action.payload };
        case APPLY_MINIMUM_RATING:
            return { ...state, minRating: action.payload };
        case APPLY_SEARCH_QUERY:
            return { ...state, searchQuery: action.payload };
        case CLEAR_FILTERS:
            return initialFilterState;
    }
};

const ProductsProvider = ({ children }) => {
    const [products, dispatch] = useReducer(productsReducer, initialState);
    const [filters, dispatchFilters] = useReducer(
        filtersReducer,
        initialFilterState
    );
    const fetchProducts = async () => {
        dispatch({ type: FETCH_PRODUCTS });
        try {
            const res = await fetch("https://dummyjson.com/products?limit=100");
            const data = await res.json();
            dispatch({
                type: FETCH_PRODUCTS_SUCCEEDED,
                payload: data.products,
            });
        } catch (err) {
            console.log(err);
            dispatch({ type: FETCH_PRODUCTS_FAILED, payload: err.message });
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <ProductsContext.Provider value={{ products,filters,dispatchFilters }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
