import React from "react";

// Components
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SideBarRow from "./SideBarRow";

/**
 * Sidebar component
 * @returns sidebar component
 */
const SideBar = () => {
  const theme = useTheme();

  return (
    <Box bgcolor={theme.primary.standard} height="100%" width="100%" padding={0} margin={0}>
      <SideBarRow title="Sample" indent={0} bold to="/sample" />
      <SideBarRow title="Login Sample" indent={1} to="/sample/login" />

      <SideBarRow title="Status" indent={0} bold to="/status" />

      <SideBarRow title="Data/Report Templates" indent={0} bold to="/templates" />
      <SideBarRow title="qPCR" indent={1} to="/templates" />
      <SideBarRow title="Virology" indent={1} to="/templates" />
      <SideBarRow title="ELISA" indent={1} to="/templates" />
      <SideBarRow title="ATPase" indent={1} to="/templates" />
    </Box>
  );
};

export default SideBar;
