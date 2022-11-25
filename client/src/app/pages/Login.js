import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { Box, TextField, Typography, Button, Grid, ThemeProvider } from "@mui/material";
import ErrorMessage from "./Home/components/ErrorMessage";

// API
import { apiLogin, apiGetAuthUser } from "../api/user";

// Context
import { UserInfoContext } from "../context/UserContext";

// Style
import { useTheme, createTheme } from "@mui/material/styles";
import bgImage from "../../assets/images/background_auth.png";
import "./Login.css";

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

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userContext = React.useContext(UserInfoContext);

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

  const [credentialError, setCredentialError] = useState(false);

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  /**
   * Handle submit action for login action.
   *
   * @param {*} e an event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser();
  };

  /**
   * Check if login action is valid. Redirect if login action is valid,
   * else set Credential Error to True, rendering an error message.
   */
  const checkUser = async () => {
    const { error, data: resData, msg } = await apiLogin(data);

    if (!error && resData) {
      setCredentialError(false);
      userContext.setUserInfo({
        username: resData.username,
        userId: resData.userId,
        firstName: resData.first_name,
        lastName: resData.last_name,
        isFetched: true
      });
      navigate("/sample");
    } else {
      setCredentialError(error);
    }
  };

  /**
   * Check if Session is active, redirecting to main page.
   */
  const isUserLoggedin = async () => {
    const { data } = await apiGetAuthUser();

    if (data.auth) {
      navigate("/sample");
    }
  };

  /**
   * React Hook to check state of Session, redirect if session is authenticated.
   */
  useEffect(() => {
    isUserLoggedin();
  }, []);

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
            fontFamily={"Kodchasan"}
            paddingTop={5}
            color={theme.secondary.lighter}
            fontWeight="bold">
            CAHS LIMS
          </Typography>

          <Typography variant="h5" color={theme.secondary.light} fontFamily={"Kodchasan"}>
            Laboratory Information Management System
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
            <Grid item xs={7} display="flex" alignItems={"center"}>
              <Typography>Don&apos;t have an account?</Typography>
            </Grid>

            <Grid item xs={4}>
              <Button
                style={{ color: theme.secondary.dark }}
                onClick={() => {
                  navigate("/signup");
                }}>
                Sign Up
              </Button>
            </Grid>
            {credentialError && <ErrorMessage msg={credentialError} />}
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Login;
