import React, { useEffect, useState } from "react";
import "./Products.css";

const Products = () => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const pageSize = 12;
    const [isFetching, setIsFetching] = useState(false);
    const [completed, setCompleted] = useState(false);
    const fetchProducts = async () => {
        setIsFetching(true);
        try {
            const res = await fetch(
                `https://dummyjson.com/products?limit=${pageSize}&skip=${products.length}`
            );
            const data = await res.json();
            setProducts((prev) => [...prev, ...data.products]);
            setCompleted(data.skip + data.products.length === data.total);
        } catch (err) {
            console.log("error", err);
        } finally {
            setIsFetching(false);
        }
    };
    const scrollHandler = () => {
        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 1000) {
            
            setPage((prev) => prev + 1);
        }
    };
    useEffect(() => {
        if (!isFetching) {
            if (completed) {
                return;
            }
            fetchProducts();
        }
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);
    return (
        <div className="products">
            {products?.map((prod) => (
                <section className="products__single" key={prod.id}>
                    <img src={prod.thumbnail} alt={prod.title} />
                    <p>{prod.title}</p>
                </section>
            ))}
            {isFetching && <div>loading...</div>}
        </div>
    );
};

export default Products;
