import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/addPizza.css";
import {
  AddPizzaChoices,
  AddPizzaToppings,
  GetToppings,
} from "../../services/orderServices";

export const AddPizza = () => {
  const [getSize, setSize] = useState("");
  const [getCheese, setCheese] = useState("");
  const [getToppings, setToppings] = useState("");
  const [getSauce, setSauce] = useState("");
  const [allToppings, setAllToppings] = useState([]);

  const { orderId } = useParams();

  const navigate = useNavigate();

  useState(() => {
    GetToppings().then(setAllToppings);
  }, []);

  const handleToppingChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setToppings([...getToppings, value]);
    } else {
      setToppings(getToppings.filter((topping) => topping !== value));
    }
  };

  const handleAddPizza = async (event) => {
    event.preventDefault();
    const pizzaOptions = {
      orderId: parseInt(orderId),
      cheeseOptionId: parseInt(getCheese),
      sauceOptionId: parseInt(getSauce),
      pizzaSizeId: parseInt(getSize),
    };
    const response = await AddPizzaChoices(orderId, pizzaOptions);
    const newPizza = await response.json();

    const pizzaToppings = getToppings.map((topping) => ({
      orderPizzasId: newPizza.id,
      toppingId: parseInt(topping),
    }));

    await Promise.all(
      pizzaToppings.map((toppingObj) => AddPizzaToppings(toppingObj))
    );
    navigate(`/orders/${orderId}`);
    //alert("New pizza added:", pizza);
  };

  return (
    <div className="add-pizza-container">
      <h2>Add a New Pizza</h2>
      <form onAddition={handleAddPizza}>
        <div className="pizza-option">
          <label>Size?</label>
          <div>
            <label>
              <input
                type="radio"
                name="size"
                value="1"
                onChange={(e) => setSize(e.target.value)}
              />{" "}
              Small
            </label>
            <label>
              <input
                type="radio"
                name="size"
                value="2"
                onChange={(e) => setSize(e.target.value)}
              />{" "}
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="size"
                value="3"
                onChange={(e) => setSize(e.target.value)}
              />{" "}
              Large
            </label>
          </div>
        </div>

        <div className="pizza-option">
          <label>Cheese?</label>
          <div>
            <label>
              <input
                type="radio"
                name="cheese"
                value="1"
                onChange={(e) => setCheese(e.target.value)}
              />{" "}
              Buffalo Mozzarella
            </label>
            <label>
              <input
                type="radio"
                name="cheese"
                value="2"
                onChange={(e) => setCheese(e.target.value)}
              />{" "}
              Four Cheese
            </label>
            <label>
              <input
                type="radio"
                name="cheese"
                value="3"
                onChange={(e) => setCheese(e.target.value)}
              />{" "}
              Vegan
            </label>
            <label>
              <input
                type="radio"
                name="cheese"
                value="4"
                onChange={(e) => setCheese(e.target.value)}
              />{" "}
              None
            </label>
          </div>
        </div>

        <div className="pizza-option">
          <label>Sauce?</label>
          <div>
            <label>
              <input
                type="radio"
                name="sauce"
                value="1"
                onChange={(e) => setSauce(e.target.value)}
              />{" "}
              Marinara
            </label>
            <label>
              <input
                type="radio"
                name="sauce"
                value="2"
                onChange={(e) => setSauce(e.target.value)}
              />{" "}
              Arrabbiata
            </label>
            <label>
              <input
                type="radio"
                name="sauce"
                value="3"
                onChange={(e) => setSauce(e.target.value)}
              />{" "}
              Garlic White
            </label>
            <label>
              <input
                type="radio"
                name="sauce"
                value="4"
                onChange={(e) => setSauce(e.target.value)}
              />{" "}
              None
            </label>
          </div>
        </div>

        <div className="pizza-option">
          <label>Toppings?</label>
          <div>
            {allToppings.map((topping) => (
              <label key={topping.id}>
                <input
                  type="checkbox"
                  value={topping.id}
                  onChange={handleToppingChange}
                />{" "}
                {topping.type}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="add-pizza-button"
          onClick={handleAddPizza}
        >
          Add New Pizza
        </button>
      </form>
    </div>
  );
};
