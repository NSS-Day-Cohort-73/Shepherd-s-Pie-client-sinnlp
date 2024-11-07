import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/AllOrders.css"

export const AllOrders = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])

  const today = new Date().toISOString().slice(0, 10)

  const [selectedDate, setSelectedDate] = useState(today)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:8088/orders")
      const data = await response.json()
      setOrders(data)
    }
    fetchOrders()
  }, [])

  useEffect(() => {
    if (selectedDate) {
      const filtered = orders.filter((order) => {
        const orderDate = new Date(order.dateTime).toISOString().slice(0, 10)
        return orderDate === selectedDate
      })
      setFilteredOrders(filtered)
    } else {
      setFilteredOrders(orders)
    }
  }, [selectedDate, orders])

  const orderDetailsArrow = (orderId) => {
    navigate(`/orders/${orderId}`)
  }

  return (
    <div className="all-orders-container">
      <h2 className="all-orders-heading">All Orders</h2>

      <fieldset className="date-filter">
        <label htmlFor="order-date" className="form-label">
          Filter by Day:
        </label>
        <input
          type="date"
          id="order-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="form-control"
        />
      </fieldset>

      <ul className="orders-list">
        {filteredOrders.map((order) => (
          <li key={order.id} className="order-item">
            <div className="order-details">
              <div>Order #{order.id}</div>
              <div>Assigned Employee ID: {order.employeeId}</div>
              <div>Total Cost: ${order.cost || "N/A"}</div>
            </div>
            <span
              className="view-arrow"
              onClick={() => orderDetailsArrow(order.id)}
            >
              →
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
