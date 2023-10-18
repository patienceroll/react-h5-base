import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Loading } from "react-vant";


import Pay from "src/pages/pay";
import Page404 from "src/pages/404";
import ErrorElement from "./components/error-element";

import "./App.css";

function App() {
  /** 和后端以及运维约定,此项目路由必须由path: '/h5' 开始 */
  const router = createBrowserRouter([
    {
      path: "/h5",
      children: [
        {
          path: "pay",
          element: <Pay />,
          errorElement: <ErrorElement />
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

  return (

      <RouterProvider fallbackElement={<Loading />} router={router} />
   
  );
}

export default App;
