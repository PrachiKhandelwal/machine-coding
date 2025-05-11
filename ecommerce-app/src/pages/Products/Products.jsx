import "./Products.css";
import { useProducts } from "../../context/ProductsProvider";
import Product from "./Product";
import { useCallback, useMemo, useState } from "react";
import Paginator from "../Paginator/Paginator";
import Filter from "../../components/Filter";

const Products = () => {
    const { products, filters } = useProducts();
    const { sortByPrice, applyOutOfStock, minRating, searchQuery } = filters;
    const [page, setPage] = useState(1);
    const pageSize = 20;
    const filteredProductsHandler = useMemo(() => {
        let filteredProducts = products.products;
        if (sortByPrice) {
            filteredProducts = filteredProducts.sort((a, b) =>
                sortByPrice === "desc" ? b.price - a.price : a.price - b.price
            );
        }
        if (!applyOutOfStock) {
            filteredProducts = filteredProducts.filter(
                (prod) => prod.availabilityStatus !== "Out of Stock"
            );
        }
        if (minRating) {
            filteredProducts = filteredProducts.filter(
                (prod) => prod.rating >= minRating
            );
        }
        if (searchQuery) {
            filteredProducts = filteredProducts.filter((prod) =>
                prod.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setPage(1);
        return filteredProducts;
    }, [
        products.products,
        sortByPrice,
        applyOutOfStock,
        minRating,
        searchQuery,
    ]);
    const filteredProducts = filteredProductsHandler;
    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "400px" }}>
                <Filter />
            </div>
            <div style={{ flexGrow: 1 }}>
                <div className="products">
                    {filteredProducts
                        ?.slice(page * pageSize - pageSize, page * pageSize)
                        .map((product) => (
                            <Product prod={product} key={product.id} />
                        ))}
                </div>
                {filteredProducts.length && <Paginator
                    setPage={setPage}
                    totalPages={Math.ceil(filteredProducts.length / pageSize)}
                    page={page}
                />}
            </div>
        </div>
    );
};

export default Products;
