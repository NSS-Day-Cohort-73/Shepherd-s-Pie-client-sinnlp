// export const GetEmployees = () => {
//   return fetch(`http://localhost:8088/employees`).then((res) => res.json());
// };

export const GetEmployees = () => {
  return fetch(`http://localhost:8088/employees`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching employees:", error);
      throw error;
    });
};

export const getEmployeeById = (employeeId) => {
  return fetch(`http://localhost:8088/employees/${employeeId}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error fetching employee with ID ${employeeId}:`, error);
      throw error;
    });
};

export const createNewEmployee = (employeeObj) => {
  return fetch(`http://localhost:8088/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeObj),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error creating new employee:", error);
      throw error;
    });
};

export const employeeUpdates = (employeeId, updatedEmployeeData) => {
  return fetch(`http://localhost:8088/employees/${employeeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmployeeData),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error updating employee with ID ${employeeId}:`, error);
      throw error;
    });
};

export const deleteEmployee = (employeeId) => {
  return fetch(`http://localhost:8088/employees/${employeeId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error deleting employee with ID ${employeeId}:`, error);
      throw error;
    });
};
