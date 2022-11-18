import React from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import notFoundImage from "../../assets/images/not_found.png";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <img src={notFoundImage} alt="" />
          </Grid>
          <Grid xs={12}>
            <Typography variant="h1" color={theme.secondary.lighter} shadows={2}>
              PAGE NOT FOUND
            </Typography>
            <Typography color={theme.secondary.light} variant="h5">
              We looked everywhere for this page.
            </Typography>
            <Typography color={theme.secondary.light} variant="h5">
              Are you sure the website URL correct?
            </Typography>
          </Grid>
          <Grid marginTop={5}>
            <Button
              sx={{ backgroundColor: theme.primary.dark }}
              variant="contained"
              onClick={() => {
                navigate("/");
              }}>
              Back Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;
