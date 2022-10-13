import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Grid from "@mui/material/Grid";
import Sidebar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Status from "./Status";
import Sample from "./Sample";
import Templates from "./Templates";

const Home = () => {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={4} height="calc(100vh - 3rem)">
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          <Routes>
            <Route path="sample" element={<Sample />} />
            <Route path="status" element={<Status />} />
            <Route path="templates" element={<Templates />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
