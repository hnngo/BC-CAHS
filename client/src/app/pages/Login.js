import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

const Login = () => {
  return (
    <div>
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
        >
          <Typography variant="h2" padding={3} textAligne="center">
            CAHS LIMS
          </Typography>
          <Typography textAligne="center">
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
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
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
    </div>
  );
};

export default Login;
