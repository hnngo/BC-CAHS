import { React } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Test from "./pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }, {
    path: "/login",
    element: <Login />,
  }, {
    path: "/signup",
    element: <Signup />,
  }, {
    path: "/test",
    element: <Test /> 
  }
]);

export default router;
