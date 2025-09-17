import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";

// main.jsx
const users = [
  { email: "luanaMaluf@passabola.com", senha: "admin" },
  { email: "aleXavier@passabola.com", senha: "admin" },
];

// Só salva no localStorage se ainda não existir
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
