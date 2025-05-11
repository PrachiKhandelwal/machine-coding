import React from "react";
import { Navigate } from "react-router";

const RequireAuth = ({ children }) => {
    let isLoggedIn = true;
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return <div>{children}</div>;
};

export default RequireAuth;
