import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { CreateOrder } from "../components/orders/Createorders";
import { AddPizza } from "../components/pizzas/addPizza";
//eventually we'll need an orders.jsx import for the order details view
import { NavBar } from "../components/nav/navBar";
import { OrderDetails } from "../components/orders/OrderDetails";
import { AllOrders } from "../components/orders/AllOrders";
import { AllEmployees } from "../components/employees/AllEmployees";
import { UpdateEmployees } from "../components/employees/UpdateEmployees";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localPieUser = localStorage.getItem("shepherds_pie_user");
    const pieUserObject = JSON.parse(localPieUser);

    setCurrentUser(pieUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route
          path="create-order"
          element={<CreateOrder currentUser={currentUser} />}
        />
        <Route
          path="all-orders"
          element={<AllOrders currentUser={currentUser} />}
        />
        <Route
          path="orders/:orderId"
          element={<OrderDetails currentUser={currentUser} />}
        />
        <Route
          path="add-pizza"
          element={<AddPizza currentUser={currentUser} />}
        />
        <Route
          path="all-employees"
          element={<AllEmployees currentUser={currentUser} />}
        />
        <Route
          path="update-employee/:employeeId"
          element={<UpdateEmployees currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
