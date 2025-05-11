import StarRating from "../../components/StarRating";

const Product = ({ prod }) => {
    return (
        <>
            <div className="product">
                <img src={prod.thumbnail} />
                <p style={{ marginBottom: "0.5rem" }}>{prod.title}</p>
                <p style={{ marginBottom: "0.5rem" }}>${prod.price}</p>
                <div style={{ marginBottom: "0.5rem" }}>
                    <StarRating maxRating={5} rating={prod.rating} />
                </div>
                <button>Add to Cart</button>
            </div>
        </>
    );
};

export default Product;
