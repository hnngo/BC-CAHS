import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import "./Login.css";
import bgImage from "../../assets/images/background_auth.png";
// import { ThemeProvider, createMuiTheme } from "@mui/material/styles";

const Login = () => {
  // const theme = createMuiTheme( {
  //   typography: {

  //   }
  // })

  const loginPageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "fixed",
    height: "100vh",
    width: "100%",
    top: 0,
    left: 0
  };

  return (
    <div className="Login-component" style={loginPageStyle}>
      <form>
        <Box
          sx={{ mt: 10 }}
          display={"flex"}
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center">
          <Typography
            variant="h1"
            fontFamily="Kodchasan"
            paddingTop={5}
            color="#bef3ff"
            textShadow="2px 2p #0c2e53"
            fontWeight="bold">
            CAHS LIMS
          </Typography>

          <Typography variant="h5" color="#7dd8ff" fontFamily="Kodchasan">
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
          backgroundColor="rgba(125, 216, 255, 0.8)">
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
            style={{ width: 250, height: 50 }}>
            Login
          </Button>

          <Typography textAligne="center" marginTop={3}>
            Don&apos;t have an anccount?
          </Typography>
          <Button>Sing Up</Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
