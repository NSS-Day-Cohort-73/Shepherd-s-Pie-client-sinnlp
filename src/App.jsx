import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { Login } from "./components/auth/Login";
import { ApplicationViews } from "./views/ApplicationViews";
import { Authorized } from "./views/Authorized";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      ></Route>
    </Routes>
  );
};
