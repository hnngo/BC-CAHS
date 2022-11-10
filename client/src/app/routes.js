import { React } from "react";
import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import LoginSample from "./pages/Home/Sample/LoginSample";
import ManageSample from "./pages/Home/Sample/ManageSample";
import Status from "./pages/Home/Status";
import ReportTemplates from "./pages/Home/ReportTemplates";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import QPCR from "./pages/Home/Status/QPCR";
import Virology from "./pages/Home/Status/Virology";
import ELISA from "./pages/Home/Status/ELISA";
import ATPase from "./pages/Home/Status/ATpase";

import Test from "./pages/Test";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/test",
    element: <Test />
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <ManageSample />
      },
      {
        path: "/sample/login",
        element: <LoginSample />
      },
      { path: "/status", element: <Status /> },
      { path: "/status/QPCR", element: <QPCR /> },
      { path: "/status/ELISA", element: <ELISA /> },
      { path: "/status/Virology", element: <Virology /> },
      { path: "/status/ATPase", element: <ATPase /> },
      { path: "/templates", element: <ReportTemplates /> }
    ]
  },
  {
    path: "*",
    element: <h1>404 Invalid Route</h1>
  }
]);

export default router;
