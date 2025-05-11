import React, { useState } from "react";
import StarRating from "./StarRating";

const Rating = () => {
    const [userRating, setUserRating] = useState(0);
    const userRatingChangeHandler = (newRating) => {
        setUserRating(newRating);
    };
    return (
        <div>
            <StarRating
                rating={userRating}
                maxRating={5}
                changeHandler={userRatingChangeHandler}
            />
        </div>
    );
};

export default Rating;
