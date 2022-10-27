import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {
  const theme = useTheme();

  //logout

  const navigate = useNavigate();

  const logout = async () => {
    await axios.post("http://localhost:8000/api/auth/logout");

    navigate("/login", { replace: true });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  //popup for logout sign
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      width={"100%"}
      height={"3rem"}
      padding={0}
      bgcolor={theme.primary.standard}
      borderBottom={`3px solid ${theme.primary.dark}`}
      boxShadow={`0px 3px 3px ${theme.primary.dark}`}>
      <Grid container direction="row" justifyContent="start" alignItems="center" height={"100%"}>
        <Grid flex={1} marginLeft={3}>
          <Typography
            variant="p"
            component="p"
            fontSize={20}
            fontWeight={"800"}
            color={theme.primary.dark}
            letterSpacing={0.5}>
            BC CAHS Laboratory Information Management System
          </Typography>
        </Grid>
        <Grid marginRight={3}>
          <Box display="flex">
            <Typography variant="p" component="p" fontSize={20} marginRight={1}>
              Hello
            </Typography>
            <Typography
              variant="p"
              component="p"
              fontSize={20}
              fontWeight={"800"}
              color={theme.primary.dark}
              marginRight={1}>
              Shelby
            </Typography>
            <AccountCircleIcon
              sx={{ fontSize: "30px", color: theme.primary.dark }}
              aria-describedby={id}
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}>
              <Box backgroundColor={theme.primary.dark}>
                <Typography
                  variant="p"
                  component="p"
                  fontSize={20}
                  fontWeight={"800"}
                  color={"white"}
                  marginRight={1}
                  marginLeft={4.5}
                  style={{ textDecoration: "none" }}
                  onClick={logout}>
                  Sign out
                </Typography>
              </Box>
            </Popover>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NavBar;
