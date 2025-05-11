import { ImStarFull } from "react-icons/im";
import { IconContext } from "react-icons/lib";
import "./StarRating.css";
import { useState } from "react";

const StarRating = ({ rating, maxRating, changeHandler }) => {
    const [hoveredRating, setHoveredRating] = useState(null);
    return (
        <div className="star-container">
            {Array.from({ length: maxRating }, (item, i) => i + 1).map(
                (item) => (
                    <IconContext.Provider
                        value={{
                            className: "star",
                            style: hoveredRating
                                ? item <= hoveredRating
                                    ? {
                                          color: "gold",
                                          transform: "scale(1.15)",
                                          transition: "transform 0.2s ease-out",
                                      }
                                    : { color: "lightgrey" }
                                : {
                                      color:
                                          item <= rating ? "gold" : "lightgrey",
                                  },
                        }}
                        key={item}
                    >
                        <ImStarFull
                            onClick={() => {
                                changeHandler(item);
                            }}
                            onMouseEnter={() => setHoveredRating(item)}
                            onMouseLeave={() => {
                                setHoveredRating(null);
                            }}
                        />
                    </IconContext.Provider>
                )
            )}
        </div>
    );
};

export default StarRating;
