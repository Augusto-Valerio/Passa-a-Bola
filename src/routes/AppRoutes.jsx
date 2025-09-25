import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Copa from "../pages/CopaPAB/Copa";
import Login from "../pages/Login/Login";
import Time from "../pages/admin/Time";
import Dashboards from "@/pages/admin/Dashboards";
import AdminLayout from "@/pages/admin/AdminLayout";

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
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Time />,
      },
      {
        path: "dashboard",
        element: <Dashboards />,
      },
      {
        path: "time",
        element: <Time />,
      },
    ],
  },
]);
