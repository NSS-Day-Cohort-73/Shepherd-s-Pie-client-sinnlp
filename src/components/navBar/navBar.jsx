import { NavLink } from "react-router-dom";
import "./styles/navBar.css";
import React from "react";

export const navBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink
          to="/create-order"
          className="navbar-btn"
          activeClassName="active"
        >
          Create Order
        </NavLink>
        <NavLink
          to="/all-orders"
          className="navbar-btn"
          activeClassName="active"
        >
          All Orders
        </NavLink>
        <NavLink
          to="/all-employees"
          className="navbar-btn"
          activeClassName="active"
        >
          All Employees
        </NavLink>
        <NavLink
          to="/sales-report"
          className="navbar-btn"
          activeClassName="active"
        >
          Sales Report
        </NavLink>
        <NavLink to="/logout" className="navbar-btn" activeClassName="active">
          Logout
        </NavLink>
      </div>
    </nav>
  );
};
