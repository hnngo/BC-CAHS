import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Breadcrumbs, Link, Typography, Chip} from "@mui/material";
import SailingIcon from '@mui/icons-material/Sailing';
import { useTheme } from "@mui/material/styles";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const breadcrumbs = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const pathNames = pathname.split("/").filter(x => x);
  return (
    <Breadcrumbs separator={<SailingIcon style={{fontSize: "18px", color: "white"}} />}>
      {pathNames.map((name, index) => {
        const isLast = index === pathNames.length - 1;
        return isLast ? ( 
          <Chip
          component="a"
          href="#"
          label={name.charAt(0).toUpperCase() + name.slice(1)}
          sx={{
            backgroundColor: theme.primary.dark,
            color: theme.primary.white,
            letterSpacing: 0.5,
            paddingX: 2,
            fontSize: "18px"
          }}
          /> 
        ) : 
        ( 
          <Chip
          component="a"
          href="#"
          label={name.charAt(0).toUpperCase() + name.slice(1)}
          icon={<ReceiptLongIcon fontSize="small" sx={{ fill: theme.primary.dark }} />}
          sx={{
            backgroundColor: theme.primary.standard,
            color: theme.primary.dark,
            letterSpacing: 0.5,
            paddingX: 2,
            fontSize: "18px"
          }}
          /> 
        )
      })}
    </Breadcrumbs>
  );
}

export default breadcrumbs;
