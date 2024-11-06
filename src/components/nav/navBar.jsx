import { NavLink } from "react-router-dom";
import "../../styles/nav.css";
import React from "react";

export const NavBar = () => {
  return (
    <nav>
      <NavLink
        to=".create-order"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Create Order
      </NavLink>
      <NavLink
        to="/all-orders"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        All Orders
      </NavLink>
      <NavLink
        to="/employees"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        All Employees
      </NavLink>
      <NavLink
        to="/sales-report"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Sales Report
      </NavLink>
      <NavLink
        to="/logout"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Logout
      </NavLink>
      {/* <NavLink
        to="/add-pizza"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Add New Pizza
      </NavLink> */}
    </nav>
  );
};
