import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Pay from "src/pages/pay";
import Page404 from "src/pages/404";

import "./App.css";

function App() {
  /** 🐟后端约定,此项目路由必须由path: '/h5' 开始 */
  const router = createBrowserRouter([
    {
      path: "/h5",
      children: [
        {
          path: "pay",
          element: <Pay />,
        },
      ],
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
