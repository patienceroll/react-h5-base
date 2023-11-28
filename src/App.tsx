import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useMemo } from "react";
import { Loading } from "react-vant";

import Pay from "src/pages/pay";
import SightList from "src/pages/sights/list";
import SightDetail from "src/pages/sights/detail";
import Page404 from "src/pages/404";
import ErrorElement from "./components/error-element";

import "./App.css";

/** 和后端以及运维约定,此项目路由必须由path: '/h5' 开始 */
const router = createBrowserRouter([
  {
    path: "/h5",
    children: [
      {
        path: "pay",
        element: <Pay />,
        errorElement: <ErrorElement />,
      },
      {
        path: "sight",
        children: [
          {
            path: "detail",
            errorElement: <ErrorElement />,
            element: <SightDetail />,
          },
          {
            path: "list",
            errorElement: <ErrorElement />,
            element: <SightList />,
          },
        ],
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

function App() {
  return <RouterProvider fallbackElement={<Loading />} router={router} />;
}

export default App;
