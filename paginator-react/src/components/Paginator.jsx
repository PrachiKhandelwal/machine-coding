import React from "react";

const Paginator = ({ page = 1, pageSize = 10, items, setPage }) => {
    const totalPages = Math.ceil(items.data.length / pageSize);
    const allPages = Array.from({ length: totalPages }, (item, i) => i + 1);
    
    return (
        items.data.length && <div style={{ width: "fit-content", margin: "0 auto" }}>
            {page > 1 && (
                <button
                    onClick={() => {
                        setPage((prev) => prev - 1);
                    }}
                >
                    Prev
                </button>
            )}
            {allPages?.map((item, idx) => (
                <button
                    key={item}
                    onClick={() => {
                        setPage(idx + 1);
                    }}
                    style={
                        page === idx + 1
                            ? { backgroundColor: "skyblue", color: "white" }
                            : {}
                    }
                >
                    {idx + 1}
                </button>
            ))}
            {page < totalPages && (
                <button
                    onClick={() => {
                        setPage((prev) => prev + 1);
                    }}
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Paginator;
