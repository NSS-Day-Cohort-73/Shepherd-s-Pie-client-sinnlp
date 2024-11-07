import React, { useState } from "react";
import "../../styles/addPizza.css";

export const AddPizza = () => {
  const [getSize, setSize] = useState("");
  const [getCheese, setCheese] = useState("");
  const [getToppings, setToppings] = useState("");
  const [getSauce, setSauce] = useState("");

  const handleToppingChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setToppings([...getToppings, value]);
    } else {
      setToppings(getToppings.filter((topping) => topping !== value));
    }
  };

  const handleAddPizza = (event) => {
    event.preventDefault();
    const pizza = { getSize, getCheese, getToppings, getSauce };
    alert("New pizza added:", pizza);
    // code to update the order state
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
                value="Small"
                onChange={() => setSize("Small")}
              />{" "}
              Small
            </label>
            <label>
              <input
                type="radio"
                name="size"
                value="Medium"
                onChange={() => setSize("Medium")}
              />{" "}
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="size"
                value="Large"
                onChange={() => setSize("Large")}
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
                value="Buffalo Mozzarella"
                onChange={() => setCheese("Buffalo Mozzarella")}
              />{" "}
              Buffalo Mozzarella
            </label>
            <label>
              <input
                type="radio"
                name="cheese"
                value="Four Cheese"
                onChange={() => setCheese("Four Cheese")}
              />{" "}
              Four Cheese
            </label>
            <label>
              <input
                type="radio"
                name="cheese"
                value="Vegan"
                onChange={() => setCheese("Vegan")}
              />{" "}
              Vegan
            </label>
            <label>
              <input
                type="radio"
                name="cheese"
                value="None"
                onChange={() => setCheese("None")}
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
                value="Marinara"
                onChange={() => setSauce("Marinara")}
              />{" "}
              Marinara
            </label>
            <label>
              <input
                type="radio"
                name="sauce"
                value="Arrabbiata"
                onChange={() => setSauce("Arrabbiata")}
              />{" "}
              Arrabbiata
            </label>
            <label>
              <input
                type="radio"
                name="sauce"
                value="Garlic White"
                onChange={() => setSauce("Garlic White")}
              />{" "}
              Garlic White
            </label>
            <label>
              <input
                type="radio"
                name="sauce"
                value="None"
                onChange={() => setSauce("None")}
              />{" "}
              None
            </label>
          </div>
        </div>

        <div className="pizza-option">
          <label>Toppings?</label>
          <div>
            {[
              "Extra Cheese",
              "Black Olive",
              "Green Pepper",
              "Sausage",
              "Pepperoni",
              "Mushroom",
              "Onion",
              "Basil",
            ].map((topping) => (
              <label key={topping}>
                <input
                  type="checkbox"
                  value={topping}
                  onChange={handleToppingChange}
                />{" "}
                {topping}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="add-pizza-button">
          Add New Pizza
        </button>
      </form>
    </div>
  );
};
