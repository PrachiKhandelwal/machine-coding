import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";

function App() {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const fetchImages = async (limit) => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://picsum.photos/v2/list?page=1&limit=${limit}`
            );
            const data = await res.json();
            setImages(data);
        } catch (err) {
            console.log("error is ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages(5);
    }, []);
    return (
        <div className="carousel-container">
            <Carousel
                isLoading={loading}
                images={images}
                onImgClick={(imgUrl) => {
                    window.open(imgUrl);
                }}
                customPrevBtn={(goToPrev) => {
                    return (
                        <button onClick={goToPrev} style={{backgroundColor:"blue",color:"white"}} className="prev">
                            Previous
                        </button>
                    );
                }}
            />
        </div>
    );
}

export default App;
