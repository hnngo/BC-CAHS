import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SideBarRow = ({ title, indent, bold, onClick, to }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      paddingLeft={((indent || 0) + 1) * 2}
      borderBottom={`2px solid ${theme.primary.dark}`}
      paddingY={2}
      onClick={() => {
        if (typeof onClick == "function") {
          onClick();
        } else if (to) {
          navigate(to);
        }
      }}
      sx={{ cursor: "pointer" }}>
      <Typography
        fontSize={"20px"}
        fontWeight={bold ? 800 : 400}
        color={theme.primary.dark}
        letterSpacing={0.5}>
        {title}
      </Typography>
    </Box>
  );
};

export default SideBarRow;
