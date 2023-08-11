import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "react-vant/es/styles";
import "./index.css";

const rootHtmlelement = document.getElementById("root");
if (rootHtmlelement) {
  const root = ReactDOM.createRoot(rootHtmlelement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
