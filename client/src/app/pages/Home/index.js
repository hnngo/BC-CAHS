import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import { Grid, Box } from "@mui/material";
import Sidebar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Status from "./Status";
import Sample from "./Sample";
import Templates from "./Templates";

// Assets
import BgHomeImage from "../../../assets/images/background_home.png";

const Home = () => {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} zIndex={1}>
          <NavBar />
        </Grid>
        <Grid item height="calc(100vh - 3rem)" width={"380px"}>
          <Sidebar />
        </Grid>
        <Grid item>
          <Box
            sx={{
              backgroundImage: `url(${BgHomeImage})`,
              backgroundSize: "contain",
              height: "calc(100vh - 3rem)",
              width: "calc(100vw - 380px)"
            }}>
            <Routes>
              <Route path="sample" element={<Sample />} />
              <Route path="status" element={<Status />} />
              <Route path="templates" element={<Templates />} />
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
