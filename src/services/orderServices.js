export const GetOrders = () => {};

export const CreateNewOrder = (orderObj) => {
  return fetch(`http://localhost:8088/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderObj),
  }).then((res) => res.json());
};
