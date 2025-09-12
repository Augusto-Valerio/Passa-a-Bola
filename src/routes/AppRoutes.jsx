import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Copa from "../pages/CopaPAB/Copa";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/copa-pab",
    element: <Copa />,
  },
]);
