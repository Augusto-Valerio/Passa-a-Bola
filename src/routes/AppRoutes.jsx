import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Copa from "../pages/CopaPAB/Copa";
import Login from "../pages/Login/Login";
import Time from "../pages/Admin/Time";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/copa-pab",
    element: <Copa />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/time",
    element: <Time />,
  },
]);
