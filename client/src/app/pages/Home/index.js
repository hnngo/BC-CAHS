import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import { Grid, Box, Breadcrumbs, Chip } from "@mui/material";
import Sidebar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Status from "./Status";
import Sample from "./Sample";
import Templates from "./Templates";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useTheme } from "@mui/material/styles";

// Assets
import BgHomeImage from "../../../assets/images/background_home.png";

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
            <Box height={"50px"} display={"flex"} justifyContent={"start"} alignItems={"center"}>
              <Breadcrumbs aria-label="breadcrumb">
                <Chip
                  component="a"
                  href="#"
                  label="Sample"
                  icon={<ReceiptLongIcon fontSize="small" sx={{ fill: theme.primary.dark }} />}
                  sx={{
                    backgroundColor: theme.primary.standard,
                    color: theme.primary.dark,
                    letterSpacing: 0.5,
                    paddingX: 2,
                    fontSize: "18px"
                  }}
                />
                <Chip
                  component="a"
                  href="#"
                  label="Login Sample"
                  sx={{
                    backgroundColor: theme.primary.dark,
                    color: theme.primary.white,
                    letterSpacing: 0.5,
                    paddingX: 2,
                    fontSize: "18px"
                  }}
                />
              </Breadcrumbs>
            </Box>
            <Box
              padding={2}
              bgcolor={theme.primary.lighter}
              borderRadius={4}
              flex={1}
              sx={{ overflowY: "scroll" }}>
              <Routes>
                <Route path="sample" element={<Sample />} />
                <Route path="status" element={<Status />} />
                <Route path="templates" element={<Templates />} />
              </Routes>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
