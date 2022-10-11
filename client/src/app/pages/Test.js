import React from "react";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0212",
    },
  },
});

const Test = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button sx={{ backgroundColor: 'success.main' }}>One</Button>
        <ThemeProvider theme={theme}>
          <Button>Two</Button>
        </ThemeProvider>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  );
}

export default Test;
