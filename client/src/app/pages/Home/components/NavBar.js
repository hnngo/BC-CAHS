import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import { Box, Grid, Typography, Popover } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Context
import { UserInfoContext } from "../../../context/UserContext";

// API
import { apiLogout } from "../../../api/user";

// Style
import { useTheme } from "@mui/material/styles";

/**
 * Navbar component
 * @returns a navbar component
 */
const NavBar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userContext = React.useContext(UserInfoContext);
  const navigate = useNavigate();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

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
          {userContext && userContext.userInfo.isFetched && userContext.userInfo.username && (
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
                marginRight={1}
                sx={{ textTransform: "capitalize" }}>
                {userContext.userInfo.firstName}
              </Typography>
              <AccountCircleIcon
                sx={{ fontSize: "30px", color: theme.primary.dark }}
                onClick={handlePopoverOpen}
              />
              {anchorEl && (
                <Popover
                  id="avatar-popover"
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorEl)}>
                  <Typography
                    sx={{ p: 1, width: "150px", cursor: "pointer" }}
                    bgcolor={theme.primary.light}
                    fontWeight={700}
                    color={theme.primary.dark}
                    onClick={async () => {
                      await apiLogout();
                      navigate("/login");
                    }}>
                    Log out
                  </Typography>
                </Popover>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default NavBar;
