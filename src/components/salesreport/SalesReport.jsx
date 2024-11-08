import { useEffect, useState } from "react";
import { GetOrders } from "../../services/orderServices.js";
import "../../styles/salesReport.css";
import { useNavigate } from "react-router-dom";

export const SalesReport = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [mostPopularCheese, setMostPopularCheese] = useState("");
  const [mostPopularSauce, setMostPopularSauce] = useState("");
  const [mostPopularSize, setMostPopularSize] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    GetOrders().then(setAllOrders);
  }, []);

  const handleMonthChange = (e) => {
    const currentMonth = e.target.value;
    const formattedMonth = currentMonth.padStart(2, "0");
    setSelectedMonth(formattedMonth);
  };

  useEffect(() => {
    const popularCheese = () => {
      const cheeseCount = {};

      allOrders
        .filter((order) =>
          order.order.dateTime.startsWith(`2024-${selectedMonth}`)
        )
        .forEach((order) => {
          cheeseCount[order.cheeseOptionId] =
            (cheeseCount[order.cheeseOptionId] || 0) + 1;
        });
      if (Object.keys(cheeseCount).length === 0) {
        return `No data available`;
      }
      const mostPopularCheeseId = Object.entries(cheeseCount).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      return allOrders.find(
        (order) => order.cheeseOptionId == mostPopularCheeseId
      )?.cheeseOption?.type;
    };
    setMostPopularCheese(popularCheese());
  }, [allOrders, selectedMonth]);

  useEffect(() => {
    const popularSauce = () => {
      const sauceCount = {};

      allOrders
        .filter((order) =>
          order.order.dateTime.startsWith(`2024-${selectedMonth}`)
        )
        .forEach((order) => {
          sauceCount[order.sauceOptionId] =
            (sauceCount[order.sauceOptionId] || 0) + 1;
        });
      if (Object.keys(sauceCount).length === 0) {
        return `No data available`;
      }
      const mostPopularSauceId = Object.entries(sauceCount).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      return allOrders.find(
        (order) => order.sauceOptionId == mostPopularSauceId
      )?.sauceOption?.type;
    };
    setMostPopularSauce(popularSauce());
  }, [allOrders, selectedMonth]);

  useEffect(() => {
    const popularSize = () => {
      const sizeCount = {};

      allOrders
        .filter((order) =>
          order.order.dateTime.startsWith(`2024-${selectedMonth}`)
        )
        .forEach((order) => {
          sizeCount[order.pizzaSizeId] =
            (sizeCount[order.pizzaSizeId] || 0) + 1;
        });
      if (Object.keys(sizeCount).length === 0) {
        return `No data available`;
      }
      const mostPopularSizeId = Object.entries(sizeCount).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      return allOrders.find((order) => order.pizzaSizeId == mostPopularSizeId)
        ?.pizzaSize?.size;
    };
    setMostPopularSize(popularSize());
  }, [allOrders, selectedMonth]);

  const handleFilteredOrders = () => {
    const filteredOrders = allOrders.filter((order) =>
      order.order.dateTime.startsWith(`2024-${selectedMonth}`)
    );
    if (filteredOrders.length > 0) {
      return filteredOrders.map((order) => (
        <section
          key={order.order.id}
          className="orders-crd"
          onClick={() => {
            navigate(`/orders/${order.order.id}`);
          }}
        >
          <div>
            <p>Order# {order.order.id}</p>
            <p>Employee# {order.order.employeeId}</p>
          </div>
          <p>Total Cost: ${order.order.cost}</p>
        </section>
      ));
    } else {
      return <p>No orders found for this month.</p>;
    }
  };

  return (
    <div className="reports-container">
      <header className="report-header">
        <select
          value={selectedMonth}
          className="form-select"
          onChange={handleMonthChange}
        >
          <option value="">Select a month</option>
          {[...Array(12).keys()].map((i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {new Date(2024, i, 1).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            );
          })}
        </select>
      </header>
      <div className="most-popular-container">
        <h3> Most Popular Choices </h3>
        <div className="popular-choices-container">
          <p className="popular-option">Cheese: {mostPopularCheese}</p>
          <p className="popular-option">Sauce: {mostPopularSauce}</p>
          <p className="popular-option">Size: {mostPopularSize}</p>
        </div>
      </div>
      <h3>Orders for this month</h3>
      <div className="monthly-orders">{handleFilteredOrders()}</div>
    </div>
  );
};
