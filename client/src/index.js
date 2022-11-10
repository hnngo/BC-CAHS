import React from "react";
import ReactDOM from "react-dom/client";

// Router
import { RouterProvider } from "react-router-dom";
import router from "./app/routes";

// Material UI
import { ThemeProvider, CssBaseline } from "@mui/material";
import { defaultTheme } from "./app/utils/theme";

// Contexts
import { UserInfoProvider } from "./app/context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline>
        <UserInfoProvider>
          <RouterProvider router={router} />
        </UserInfoProvider>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>
);
