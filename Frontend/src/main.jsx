import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContext from "./context/UserContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>
);
