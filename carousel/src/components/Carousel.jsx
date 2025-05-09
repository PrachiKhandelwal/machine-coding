import React, { useEffect, useRef, useState } from "react";
import './Carousel.css';

const Carousel = ({
    images = [],
    isLoading = false,
    customPrevBtn,
    customNextBtn,
    imagePerSlide = 2,
    onImgClick = () => {},
}) => {
    const [curIndex, setCurIndex] = useState(0);
    const [imgWidth, setImgWidth] = useState(0);
    const imgRef = useRef(null);

    useEffect(() => {
        setCurIndex(0);
    }, [images]);

    const goToPrev = () => {
        setCurIndex((prev) =>
            prev === 0 ? images.length - imagePerSlide : prev - 1
        );
    };
    const goToNext = () => {
        setCurIndex((prev) =>
            prev === images.length - imagePerSlide ? 0 : prev + 1
        );
    };

    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <div className="carousel" style={{ width: imgWidth * imagePerSlide }}>
            <div
                className="image-container"
                style={{ transform: `translateX(-${curIndex * imgWidth}px)` }}
            >
                {images.map((image, index) => (
                    <img
                        src={image.download_url}
                        key={image.id}
                        className="image"
                        ref={index === 0 ? imgRef : null}
                        onLoad={() => {
                            if (index === 0 && imgRef.current) {
                                setImgWidth(imgRef.current.offsetWidth);
                            }
                        }}
                        onClick={() => {
                            onImgClick(image.download_url);
                        }}
                    />
                ))}
            </div>
            {customPrevBtn ? (
                customPrevBtn(goToPrev)
            ) : (
                <button onClick={goToPrev} className="prev">
                    Previous
                </button>
            )}
            {customNextBtn ? (
                customNextBtn(goToNext)
            ) : (
                <button onClick={goToNext} className="next">
                    Next
                </button>
            )}
        </div>
    );
};

export default Carousel;
