import React from "react";

const Paginator = ({ setPage, totalPages, page }) => {
    const pageHandler = (newPage) => {
        setPage(newPage);
    };
    return (
        <div
            style={{ width: "fit-content", margin: "auto", marginTop: "1rem" }}
        >
            {page>1 && <button className="paginator-btn" onClick={()=>{setPage(prev=>prev-1)}}>◀️</button>}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
                <button
                    className="paginator-btn"
                    style={
                        page === item
                            ? {
                                  backgroundColor: "blue",
                                  color: "white",
                              }
                            : {}
                    }
                    onClick={() => pageHandler(item)}
                >
                    {item}
                </button>
            ))}
            {page < totalPages &&<button className="paginator-btn" onClick={()=>{setPage(prev=>prev+1)}}>▶️</button>}
        </div>
    );
};

export default Paginator;
