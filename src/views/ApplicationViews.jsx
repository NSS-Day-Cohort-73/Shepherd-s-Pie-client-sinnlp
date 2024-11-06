import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { CreateOrder } from "../components/orders/Createorders";
import { NavBar } from "../components/nav/navBar";

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
      </Route>
    </Routes>
  );
};
