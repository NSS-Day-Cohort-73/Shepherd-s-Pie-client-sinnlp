import { useEffect, useState } from "react";
import { GetOrders } from "../../services/orderServices";

export const SalesReport = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    GetOrders().then(setAllOrders);
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="container">
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
    </div>
  );
};
