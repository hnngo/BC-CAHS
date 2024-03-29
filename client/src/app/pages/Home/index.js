import React from "react";
import { Outlet } from "react-router-dom";

// Components
import { Grid, Box, Chip } from "@mui/material";
import Sidebar from "./components/SideBar";
import NavBar from "./components/NavBar";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useTheme } from "@mui/material/styles";
import Breadcrumbs from "./components/Breadcrumbs";

import withAuth from "../Home/components/WithAuth";
// Assets
import BgHomeImage from "../../../assets/images/background_home.png";

/**
 * Home/ landing page of project
 * @returns Home page
 */
const Home = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} zIndex={1}>
        <NavBar />
      </Grid>
      <Grid item height="calc(100vh - 3rem)" width={"380px"}>
        <Sidebar />
      </Grid>
      <Grid
        item
        padding={2}
        flex={1}
        sx={{
          backgroundImage: `url(${BgHomeImage})`,
          backgroundSize: "contain",
          height: "calc(100vh - 3rem)",
          width: "calc(100vw - 380px)"
        }}>
        <Box height="100%">
          <Grid container direction={"column"} flexWrap={"unset"} height="100%">
            <Box height={"50px"} display={"flex"} justifyContent={"start"} alignItems={"start"}>
              <Breadcrumbs>
              </Breadcrumbs>
            </Box>
            <Box
              padding={2}
              bgcolor={theme.primary.lighter}
              borderRadius={4}
              flex={1}
              sx={{ overflowY: "scroll" }}>
              <Outlet />
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default withAuth(Home);
