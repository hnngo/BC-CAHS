import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import "./Login.css";

const Login = () => {
  return (
    <div className="Login-component">
      <form>
        <Box className="text-field" sx={{ mt: 10 }}>
          <Typography
            className="company-name-text"
            variant="h1"
            fontFamily="Kodchasan"
          >
            CAHS LIMS
          </Typography>

          <Typography
            className="system-name-text"
            fontFamily="Kodchasan"
            variant="h2"
          >
            Labotory Information Management System
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          padding={3}
          backgroundColor="rgba(125, 216, 255, 0.8)"
        >
          <TextField
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Email"
            style={{ width: 250, height: 50 }}
          />
          <TextField
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Password"
            style={{ width: 250, height: 50 }}
          />
          <Button
            sx={{ marginTop: 3 }}
            variant="contained"
            backgroundColor="#0B8AC0"
            style={{ width: 250, height: 50 }}
          >
            Login
          </Button>

          <Typography textAligne="center" marginTop={3}>
            Don't have an anccount?
          </Typography>
          <Button>Sing Up</Button>
        </Box>
      </form>
      <div></div>
    </div>
  );
};

export default Login;
