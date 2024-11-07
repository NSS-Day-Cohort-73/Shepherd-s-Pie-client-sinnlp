export const GetOrders = () => {
  return fetch(
    `http://localhost:8088/orderPizzas?&_expand=order&_expand=cheeseOption&_expand=pizzaSize&_expand=sauceOption`
  ).then((res) => res.json());
};

export const CreateNewOrder = (orderObj) => {
  return fetch(`http://localhost:8088/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderObj),
  }).then((res) => res.json());
};

export const GetOrderById = async (orderId) => {
  const response = await fetch(
    `http://localhost:8088/orderPizzas?orderId=${orderId}&_expand=order&_expand=cheeseOption&_expand=pizzaSize&_expand=sauceOption`
  );
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
};

export const GetToppingsByPizzaId = (orderPizzaId) => {
  return fetch(
    `http://localhost:8088/orderToppings?orderPizzaId=${orderPizzaId}&_expand=topping`
  ).then((res) => res.json());
};

export const AddDeliverer = (orderId, orderObj) => {
  return fetch(`http://localhost:8088/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderObj),
  });
};

export const DeletePizza = (orderPizzaId) => {
  return fetch(`http://localhost:8088/orderPizzas/${orderPizzaId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const CancelOrder = (orderId) => {
  return fetch(`http://localhost:8088/orders/${orderId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
