import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MapPage from "./pages/MapPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MapPage />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);