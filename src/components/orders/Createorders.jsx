import { useState } from "react";
import { CreateNewOrder } from "../../services/orderServices";
import { useNavigate } from "react-router-dom";
import "../../styles/orders.css";

export const CreateOrder = ({ currentUser }) => {
  const [newOrder, setNewOrder] = useState({
    tableNumber: null,
    isDelivery: false,
    tip: false,
  });

  const navigate = useNavigate();
  const handleCreateOrder = (e) => {
    e.preventDefault();
    const newOrderObj = {
      isDelivery: newOrder.isDelivery,
      dateTime: new Date(),
      tableNumber: newOrder.tableNumber,
      tip: newOrder.tip,
      delivererId: null,
      employeeId: currentUser.id,
      cost: null,
    };
    CreateNewOrder(newOrderObj).then((response) => {
      navigate(`/orders/${response.id}`);
    });
  };
  return (
    <form className="container new-order-container">
      <h3>New Order:</h3>
      <fieldset>
        <label className="form-label">Is this for delivery?</label>
        <input
          className="form-check"
          type="checkbox"
          onChange={(e) => {
            const orderCopy = { ...newOrder };
            orderCopy.isDelivery = e.target.checked;
            setNewOrder(orderCopy);
          }}
        />
      </fieldset>
      {!newOrder.isDelivery && (
        <fieldset>
          <label className="form-label">Table Number</label>{" "}
          <input
            className="form-control"
            type="number"
            required
            placeholder="enter table number"
            onChange={(e) => {
              const orderCopy = { ...newOrder };
              orderCopy.tableNumber = e.target.value;
              setNewOrder(orderCopy);
            }}
          ></input>
        </fieldset>
      )}
      <fieldset>
        <label className="form-label">Tip?</label>
        <input
          className="form-check"
          type="checkbox"
          onChange={(e) => {
            const orderCopy = { ...newOrder };
            orderCopy.tip = e.target.checked;
            setNewOrder(orderCopy);
          }}
        />
      </fieldset>

      <button className="btn btn-primary" onClick={handleCreateOrder}>
        Create Order
      </button>
    </form>
  );
};
