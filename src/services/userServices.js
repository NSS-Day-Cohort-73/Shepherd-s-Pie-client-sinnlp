export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/employees?email=${email}`).then((res) =>
    res.json()
  );
};
