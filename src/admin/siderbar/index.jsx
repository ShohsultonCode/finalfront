import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Sidebar = () => {
    const token = localStorage.getItem("token");

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h2>Dashboard</h2>
            </div>
            <ul className="sidebar-nav">
                <li>
                    <Link to="/dashboard" className="nav-link">
                        <i className="fas fa-chart-bar"></i> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/products" className="nav-link">
                        <i className="fas fa-shopping-basket"></i> Products
                    </Link>
                </li>
                <li>
                    <Link to="/sells" className="nav-link">
                        <i className="fas fa-dollar-sign"></i> Sells
                    </Link>
                </li>
                <li onClick={(() => {
                    localStorage.clear()
                    window.location.reload()
                })}>
                    <Link to="/" className="nav-link">
                        <i className="fas fa-dollar-sign"></i> Log Out
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
