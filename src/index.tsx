import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MapPage from "./MapPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MapPage />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);