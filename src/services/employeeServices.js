export const GetEmployees = () => {
  return fetch(`http://localhost:8088/employees`).then((res) => res.json());
};
