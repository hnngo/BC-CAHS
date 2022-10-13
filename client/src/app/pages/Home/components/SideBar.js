import React from "react";

// Components
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SideBarRow from "./SideBarRow";

const SideBar = () => {
  const theme = useTheme();

  return (
    <Box bgcolor={theme.primary.standard} height="100%" width="100%" padding={0} margin={0}>
      <SideBarRow title="Sample" indent={0} bold />
      <SideBarRow title="Login Sample" indent={1} />
      <SideBarRow title="Manage Sample" indent={1} />

      <SideBarRow title="Status" indent={0} bold />
      <SideBarRow title="qPCR" indent={1} />
      <SideBarRow title="Virology" indent={1} />
      <SideBarRow title="ELISA" indent={1} />
      <SideBarRow title="ATPase" indent={1} />

      <SideBarRow title="Data/Report Templates" indent={0} bold />
      <SideBarRow title="qPCR" indent={1} />
      <SideBarRow title="Virology" indent={1} />
      <SideBarRow title="ELISA" indent={1} />
      <SideBarRow title="ATPase" indent={1} />
    </Box>
  );
};

export default SideBar;
