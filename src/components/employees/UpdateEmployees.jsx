import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEmployeeById,
  employeeUpdates,
} from "../../services/employeeServices";
import "../../styles/updateEmployees.css";

export const UpdateEmployees = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    getEmployeeById(employeeId).then((data) => setEmployee(data));
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    employeeUpdates(employeeId, employee).then(() =>
      navigate("/all-employees")
    );
  };

  return (
    <div className="update-employee-container">
      <h3>Update Employee</h3>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={employee.address}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone number:
        <input
          type="text"
          name="phoneNumber"
          value={employee.phoneNumber}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit} className="submit-btn">
        Submit &#x27A4;
      </button>
    </div>
  );
};
