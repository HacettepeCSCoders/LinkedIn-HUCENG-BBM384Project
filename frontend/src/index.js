import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import withApiProgress from "./shared/ApiProgress";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <div>
    <withApiProgress>
      <App />
    </withApiProgress>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
