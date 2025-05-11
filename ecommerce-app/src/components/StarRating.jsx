import { IconContext } from "react-icons";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, maxRating }) => {
    return (
        <div>
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((item) => (
                <IconContext.Provider value={{style:item<=rating ? {color:'gold'}:{color:"lightgray"}}}>
                    <FaStar />
                </IconContext.Provider>
            ))}
        </div>
    );
};

export default StarRating;
