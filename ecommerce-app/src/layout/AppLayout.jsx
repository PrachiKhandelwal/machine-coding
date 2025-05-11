import React from "react";
import { Outlet } from "react-router";
import "./AppLayout.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppLayout = () => {
    return (
        <div className="container">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AppLayout;
