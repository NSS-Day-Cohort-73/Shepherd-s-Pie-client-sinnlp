import React, { useState, useEffect } from "react"
import { GetOrderById, GetToppingsByPizzaId, updateOrder,
} from "../../services/orderServices"
import "../../styles/UpdateOrder.css"

export const UpdateOrder = ({ orderId }) => {
  const [pizzaSize, setPizzaSize] = useState(null)
  const [cheeseOption, setCheeseOption] = useState(null)
  const [sauceOption, setSauceOption] = useState(null)
  const [toppings, setToppings] = useState([]) 

  useEffect(() => {
    const fetchOrderData = async () => {
      const orderPizzas = await GetOrderById(orderId)
      const pizza = orderPizzas[0] 
      setPizzaSize(pizza.pizzaSizeId)
      setCheeseOption(pizza.cheeseOptionId)
      setSauceOption(pizza.sauceOptionId)

      const toppingsData = await GetToppingsByPizzaId(pizza.id)
      const toppingIds = toppingsData.map((topping) => topping.toppingId)
      setToppings(toppingIds)
    }

    fetchOrderData()
  }, [orderId])

  const handleSizeChange = (event) => setPizzaSize(parseInt(event.target.value))
  const handleCheeseChange = (event) =>
    setCheeseOption(parseInt(event.target.value))
  const handleSauceChange = (event) =>
    setSauceOption(parseInt(event.target.value))
  const handleToppingChange = (event) => {
    const toppingId = parseInt(event.target.value)
    setToppings(
      (prevToppings) =>
        prevToppings.includes(toppingId)
          ? prevToppings.filter((id) => id !== toppingId)
          : [...prevToppings, toppingId] 
    )
  }

  const handleUpdateOrder = async () => {
    const updatedPizza = {
      pizzaSizeId: pizzaSize,
      cheeseOptionId: cheeseOption,
      sauceOptionId: sauceOption,
      toppings: toppings,
    }

    await updateOrder(orderId, updatedPizza)
    alert("Order updated successfully!")
  }

  return (
    <div className="update-order-container">
      <h3>Update Order</h3>

      <fieldset className="inline-options">
        <legend>Size</legend>
        <label>
          <input
            type="radio"
            value="1"
            checked={pizzaSize === 1}
            onChange={handleSizeChange}
          />
          Small
        </label>
        <label>
          <input
            type="radio"
            value="2"
            checked={pizzaSize === 2}
            onChange={handleSizeChange}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={pizzaSize === 3}
            onChange={handleSizeChange}
          />
          Large
        </label>
      </fieldset>

      <fieldset className="inline-options">
        <legend>Cheese</legend>
        <label>
          <input
            type="radio"
            value="1"
            checked={cheeseOption === 1}
            onChange={handleCheeseChange}
          />
          Buffalo Mozzarella
        </label>
        <label>
          <input
            type="radio"
            value="2"
            checked={cheeseOption === 2}
            onChange={handleCheeseChange}
          />
          Four Cheese
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={cheeseOption === 3}
            onChange={handleCheeseChange}
          />
          Vegan
        </label>
        <label>
          <input
            type="radio"
            value="4"
            checked={cheeseOption === 4}
            onChange={handleCheeseChange}
          />
          None
        </label>
      </fieldset>

      <fieldset className="inline-options">
        <legend>Sauce</legend>
        <label>
          <input
            type="radio"
            value="1"
            checked={sauceOption === 1}
            onChange={handleSauceChange}
          />
          Marinara
        </label>
        <label>
          <input
            type="radio"
            value="2"
            checked={sauceOption === 2}
            onChange={handleSauceChange}
          />
          Arrabbiata
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={sauceOption === 3}
            onChange={handleSauceChange}
          />
          Garlic White
        </label>
        <label>
          <input
            type="radio"
            value="4"
            checked={sauceOption === 4}
            onChange={handleSauceChange}
          />
          None
        </label>
      </fieldset>

      <fieldset className="toppings-options">
        <legend>Toppings</legend>
        {[
          { id: 1, label: "Sausage" },
          { id: 2, label: "Pepperoni" },
          { id: 3, label: "Mushroom" },
          { id: 4, label: "Onion" },
          { id: 5, label: "Green Pepper" },
          { id: 6, label: "Black Olive" },
          { id: 7, label: "Basil" },
          { id: 8, label: "Extra Cheese" },
        ].map((topping) => (
          <label key={topping.id}>
            <input
              type="checkbox"
              value={topping.id}
              checked={toppings.includes(topping.id)}
              onChange={handleToppingChange}
            />
            {topping.label}
          </label>
        ))}
      </fieldset>
      <div className="button-container">
        <button className="update-pizza-button" onClick={handleUpdateOrder}>
          Update Pizza
        </button>
      </div>
    </div>
  )
}
