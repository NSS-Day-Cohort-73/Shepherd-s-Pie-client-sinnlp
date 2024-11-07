import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { GetEmployees } from "../../services/employeeServices";
import "../../styles/allEmployees.css";

export const AllEmployees = () => {
  const [getEmployees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    GetEmployees().then((data) => setEmployees(data));
  }, []);

  const handleEmployeeEdit = (employeeId) => {
    navigate(`/update-employee/${employeeId}`);
  };

  return (
    <div className="all-employees-container">
      <h3>All Employees</h3>
      <div className="employee-list">
        {getEmployees.map((employee) => (
          <div className="employee-card" key={employee.id}>
            <span>
              <i>{employee.name}</i>
            </span>
            <span>
              <i>{employee.email}</i>
            </span>
            <span>
              <i>{employee.address}</i>
            </span>
            <span>
              <i>{employee.phoneNumber}</i>
            </span>
            <button onClick={() => handleEmployeeEdit(employee.id)}>
              &#x27A4;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
