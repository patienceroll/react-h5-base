import { createRoot } from "react-dom/client";

import App from "./app";
import React from "react";

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(React.createElement(App));
