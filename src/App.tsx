import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Pay from "src/pages/pay";
import Page404 from "src/pages/404";

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
