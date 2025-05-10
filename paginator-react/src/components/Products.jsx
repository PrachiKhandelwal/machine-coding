import React, { useEffect, useState } from "react";
import Paginator from "./Paginator";

const Products = () => {
    const [products, setProducts] = useState({ loading: false, data: [] });
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const fetchProducts = async () => {
        setProducts((prev) => ({ ...prev, loading: true }));
        try {
            const res = await fetch("https://dummyjson.com/products?limit=21");
            const data = await res.json();
            setProducts({ loading: false, data: data.products });
        } catch {
            setProducts({ loading: false, data: [] });
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    if (products.loading) {
        return <div>Loading...</div>;
    }
    if (products?.data?.length === 0) {
        return <div>No products found!</div>;
    }
    return (
        <>
            <div className="products">
                {products.data
                    ?.slice(page * pageSize - pageSize, page * pageSize)
                    ?.map((product) => (
                        <section key={product.id} className="products__single">
                            <img src={product.thumbnail} alt={product.title} />
                            <p>{product.title}</p>
                        </section>
                    ))}
            </div>
            <Paginator
                page={page}
                pageSize={pageSize}
                items={products}
                setPage={setPage}
            />
        </>
    );
};

export default Products;
