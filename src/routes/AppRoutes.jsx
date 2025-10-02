import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Copa from "../pages/CopaPAB/Copa";
import Login from "../pages/Login/Login";
import Time from "../pages/admin/Time";
import Dashboards from "@/pages/admin/Dashboards";
import AdminLayout from "@/pages/admin/AdminLayout";
import CentralDeTimes from "@/pages/admin/CentralDeTimes";
import Inbox from "@/pages/admin/Inbox";

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
        element: <CentralDeTimes />,
      },
      {
        path: "inbox",
        element: <Inbox />,
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
