import { React } from "react";
import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "./pages/Home";
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
    children: [{ path: "/sample" }, { path: "/status" }, { path: "/templates" }]
  }
]);

export default router;
