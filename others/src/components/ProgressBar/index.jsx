import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

function Progress() {
    const [progress, setProgress] = useState(0);
    const maxProgress = 9;
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= maxProgress) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <ProgressBar value={progress} />
        </>
    );
}

export default Progress;
