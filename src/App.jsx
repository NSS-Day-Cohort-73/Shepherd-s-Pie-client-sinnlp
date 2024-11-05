import { ApplicationViews } from "./views/ApplicationViews";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Authorized } from "./views/Authorized";
import "./styles/App.css";

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
