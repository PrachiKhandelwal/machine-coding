import React from "react";
import { useRouteError } from "react-router";

const Error = () => {
    const err = useRouteError();
    return (
        <div>
            <h1>Something went wrong!!</h1>
            <p>
                {err.status}: {err.data}
            </p>
        </div>
    );
};

export default Error;
