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
        path: "/sample/login",
        element: <LoginSample />
      },
      {
        path: "/sample/manage",
        element: <ManageSample />
      },
      { path: "/status", element: <Status /> },
    ]
  }
]);

export default router;
