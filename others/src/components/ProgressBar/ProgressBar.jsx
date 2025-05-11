import "./ProgressBar.css";

const ProgressBar = ({ value=70 }) => {
    return (
        <div className="outer">
            <div className="inner" style={{width:`${value}%`}} role="progressbar" aria-valuemax={100} aria-valuemin={0} aria-valuenow={value}></div>
            <p className="percentage">{value}%</p>
        </div>
    );
};

export default ProgressBar;
