import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AddDeliverer,
  CancelOrder,
  DeletePizza,
  GetOrderById,
  GetToppingsByPizzaId,
} from "../../services/orderServices";
import { GetEmployees } from "../../services/employeeServices";

export const OrderDetails = ({ currentUser }) => {
  const [currentOrder, setCurrentOrder] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [orderToEdit, setOrderToEdit] = useState({});

  const { orderId } = useParams();

  useEffect(() => {
    GetOrderById(orderId).then((o) => {
      setCurrentOrder(o);
      setOrderToEdit(o[0].order);
    });
    GetToppingsByPizzaId(currentOrder.id).then(setToppings);
    GetEmployees().then(setEmployees);
  }, [orderId]);

  const handlePizzaCost = (order) => {
    const basePrice = order.pizzaSize.price;
    const toppingCost =
      toppings.filter((topping) => topping.orderPizzasId === order.id).length *
      0.5;
    const deliveryCost = order.order.isDelivery ? 5 : 0;
    return basePrice + toppingCost + deliveryCost;
  };

  const handleTotalCost = () => {
    let totalCost = 0;
    currentOrder.forEach((order) => {
      const basePrice = order.pizzaSize.price;
      const toppingCost =
        toppings.filter((topping) => topping.orderPizzasId === order.id)
          .length * 0.5;
      const deliveryCost = order.order.isDelivery ? 5 : 0;

      totalCost += basePrice + toppingCost + deliveryCost;
    });
    return totalCost;
  };

  const handleDriver = () => {
    if (
      currentUser.isAdmin &&
      currentOrder.length > 0 &&
      currentOrder[0].order?.isDelivery
    ) {
      return (
        <>
          <label>Assign Deliverer</label>
          <select
            className="form-select"
            value={orderToEdit.delivererId}
            onChange={(e) => {
              const copy = { ...orderToEdit };
              copy.delivererId = parseInt(e.target.value);
              setOrderToEdit(copy);
            }}
          >
            <option value="">Choose Driver</option>
            {employees.map((employee) => {
              return (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              );
            })}
          </select>
          <button
            className="btn btn-primary btn-confirm"
            onClick={handleAddDeliverer}
          >
            Ok
          </button>
        </>
      );
    }
  };

  const handleAddDeliverer = () => {
    AddDeliverer(orderId, orderToEdit);
  };
  return (
    <div className="container">
      <section className="details-container">
        <h3 className="order-number">Order# {orderToEdit.id}</h3>
        {currentOrder.map((order, i) => {
          return (
            <div key={i} className="pizza-choices">
              <div className="pizza-choice">
                <span className="bold">Size: </span>
                {order.pizzaSize.size}
              </div>
              <div className="pizza-choice">
                <span className="bold">Cheese: </span>
                {order.cheeseOption.type}
              </div>
              <div className="pizza-choice">
                <span className="bold">Sauce: </span>
                {order.sauceOption.type}
              </div>
              <span className="bold">Toppings: </span>
              <ul className="pizza-choice">
                {toppings
                  .filter((topping) => topping.orderPizzasId === order.id)
                  .map((topping) => {
                    return (
                      <li key={topping.topping.id} className="topping">
                        {topping.topping.type}
                      </li>
                    );
                  })}
              </ul>
              <div className="pizza-choice">
                Cost: ${handlePizzaCost(order).toFixed(2)}
              </div>
              <button className="btn btn-primary">Update Pizza</button>{" "}
              {/*Still need to add navigation for updating pizza once that view is done*/}
              <button
                className="btn btn-secondary"
                onClick={() => {
                  DeletePizza(currentOrder[i].id)
                    .then(GetOrderById)
                    .then(setCurrentOrder);
                }}
              >
                Delete Pizza
              </button>
            </div>
          );
        })}
      </section>
      <section className="utilities-container">
        <h3>Total Order Cost: ${handleTotalCost().toFixed(2)}</h3>
        <div className="order-utilities">
          <Link to={"/add-pizza"}>
            <button className="btn btn-primary">Add Pizza</button>
          </Link>
          <button
            className="btn btn-secondary"
            onClick={() => {
              CancelOrder(currentOrder[0].order?.id);
            }}
          >
            Cancel Order
          </button>
          {handleDriver()}
        </div>
      </section>
    </div>
  );
};
