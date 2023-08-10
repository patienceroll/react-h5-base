import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Pay from "./pages/pay";
import Page404 from "./pages/404";

import useEnv from "@/hook/use-env";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/pay",
      element: <Pay />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
