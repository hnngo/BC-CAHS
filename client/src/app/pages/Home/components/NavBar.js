import React from "react";
import { Box, Grid, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();

  return (
    <Box
      width={"100%"}
      height={"3rem"}
      padding={0}
      bgcolor={theme.primary.standard}
    >
      <Grid
        container
        direction="row"
        justifyContent="start"
        alignItems="center"
        height={"100%"}
      >
        <Grid flex={1} marginLeft={3}>
          <Typography variant="p" component="p" fontSize={20} fontWeight={"800"} color={theme.primary.dark} letterSpacing={0.5}>
            BC CAHS Laboratory Information Management System
          </Typography>
        </Grid>
        <Grid marginRight={3}>
          <Box display="flex">
            <Typography variant="p" component="p" fontSize={20} marginRight={1}>
              Hello
            </Typography>
            <Typography variant="p" component="p" fontSize={20} fontWeight={"800"} color={theme.primary.dark}>
              Shellby
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Navbar;
