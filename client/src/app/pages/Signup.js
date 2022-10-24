import React from "react";
import { Box, TextField, Typography, Button, Grid } from "@mui/material";
import "./Login.css";
import bgImage from "../../assets/images/background_auth.png";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

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

const users = [
  {
    username: "admin1",
    password: "12345678"
  },
  {
    username: "admin2",
    password: "012345678"
  }
];

const Signup = () => {
  const theme = useTheme();

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

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser();
    console.log(checkUser());
  };

  const checkUser = () => {
    const usercheck = users.find(
      (user) => user.username === data.username && user.password === data.password
    );
    if (usercheck) {
      console.log("Login successful");
    } else {
      console.log("Wrong password or username");
    }
    console.log(usercheck);
  };

  useEffect(() => {
    checkUser(users);
  }, [data.username, data.password]);

  console.log(data);

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
            name="username"
            variant="outlined"
            placeholder="Username"
            style={{ width: 300, height: 50 }}
            InputProps={{ inputProps: { style: { color: theme.primary.dark } } }}
            value={data.username}
            onChange={changeHandler}
          />

          <TextField
            margin="normal"
            name="password"
            type={"password"}
            variant="outlined"
            placeholder="Password"
            style={{ width: 300, height: 50 }}
            value={data.password}
            onChange={changeHandler}
          />

          <TextField
            margin="normal"
            name="Confirm Password"
            type={"password"}
            variant="outlined"
            placeholder="Confirm Password"
            style={{ width: 300, height: 50 }}
            value={data.password}
            onChange={changeHandler}
          />
          <Button
            sx={{ marginTop: 3 }}
            variant="contained"
            style={{ width: 300, height: 50, background: theme.secondary.dark }}
            type="submit"
            onClick={handleSubmit}>
            Login
          </Button>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={7} pt={1}>
              <Typography>Already had an account?</Typography>
            </Grid>

            <Grid item xs={3} pt={1}>
              <Button style={{ color: theme.secondary.dark }} as={Link} to={"/login"}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
};
export default Signup;
