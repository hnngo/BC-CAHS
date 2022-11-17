import React from "react";
import { Box, TextField, Typography, Button, Grid } from "@mui/material";
import "./Login.css";
import bgImage from "../../assets/images/background_auth.png";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import validateSignup from "../utils/validateSignup";

import SuccessAlert from "./Home/components/SuccessAlert";
// API
import { apiSignup } from "../api/user";

export const customTheme = createTheme({
  typography: {
    fontFamily: [
      "Kodchasan",
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const loginPageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "fixed",
    height: "100vh",
    width: "100%",
    top: 0,
    left: 0,
    overflow: "scroll",
    paddingBottom: "5%"
  };

  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: ""
  });

  const [errors, setErrors] = useState({});

  const [isValid, setValid] = useState(false);

  const [response, setResponse] = useState(false);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateSignup(data));

    if (validateSignup(data)) {
      console.log("inside submission logic");
      apiSignup(data).then(({ error }) => {
        if (error == 109) {
          setResponse(true);
          console.log("response set to true");
          setValid(true);
        } else {
          console.log("set to false");
          setValid(true);
        }
      });
      setValid(false);
      setResponse(false);
    }
  };

  useEffect(() => {}, [
    data.first_name,
    data.last_name,
    data.username,
    data.password,
    data.confirmPassword
  ]);

  return (
    <div className="Login-component" style={loginPageStyle}>
      <ThemeProvider theme={customTheme}>
        <Box
          sx={{ mt: 10 }}
          display={"flex"}
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center">
          <Typography
            variant="h1"
            paddingTop={5}
            color={theme.secondary.lighter}
            // textShadow={`2px 2px ${theme.primary.dark}`}
            fontWeight="bold">
            CAHS LIMS
          </Typography>

          <Typography variant="h5" color={theme.secondary.light} fontFamily={"Kodchasan"}>
            Labotory Information Management System
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          borderRadius={2}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          padding={3}
          backgroundColor="rgba(125, 216, 255, 0.8)">
          <TextField
            margin="normal"
            type={"text"}
            name="first_name"
            variant="outlined"
            placeholder="First name"
            style={{ width: 300, height: 40 }}
            InputProps={{ inputProps: { style: { color: theme.primary.dark } } }}
            value={data.first_name}
            onChange={changeHandler}
          />
          {errors.first_name && <p className="error">{errors.first_name}</p>}

          <TextField
            margin="normal"
            type={"text"}
            name="last_name"
            variant="outlined"
            placeholder="Last name"
            style={{ width: 300, height: 40 }}
            InputProps={{ inputProps: { style: { color: theme.primary.dark } } }}
            value={data.last_name}
            onChange={changeHandler}
          />
          {errors.last_name && <p className="error">{errors.last_name}</p>}

          <TextField
            margin="normal"
            type={"text"}
            name="username"
            variant="outlined"
            placeholder="Username"
            style={{ width: 300, height: 40 }}
            InputProps={{ inputProps: { style: { color: theme.primary.dark } } }}
            value={data.username}
            onChange={changeHandler}
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <TextField
            margin="normal"
            name="password"
            type={"password"}
            variant="outlined"
            placeholder="Password"
            style={{ width: 300, height: 40 }}
            value={data.password}
            onChange={changeHandler}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <TextField
            margin="normal"
            name="confirmPassword"
            type={"password"}
            variant="outlined"
            placeholder="Confirm Password"
            style={{ width: 300, height: 40 }}
            value={data.confirmPassword}
            onChange={changeHandler}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <Button
            sx={{ marginTop: 3 }}
            variant="contained"
            style={{ width: 300, height: 40, background: theme.secondary.dark }}
            type="submit"
            onClick={handleSubmit}>
            Signup
          </Button>

          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={7} pt={1}>
              <Typography>Already have an account?</Typography>
            </Grid>

            <Grid item xs={3} pt={1}>
              <Button
                style={{ color: theme.secondary.dark }}
                onClick={() => {
                  navigate("/login");
                }}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
        {isValid && <SuccessAlert isDuplicate={response} />}
      </ThemeProvider>
    </div>
  );
};
export default Signup;
