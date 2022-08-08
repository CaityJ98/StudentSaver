import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextStore } from "./ContextStore";
import reportWebVitals from "./reportWebVitals";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextStore>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextStore>
  
);

reportWebVitals();
