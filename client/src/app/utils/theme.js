import { createTheme } from '@mui/material/styles';
import MontserratBold from "../fonts/Montserrat/static/Montserrat-Bold.ttf";
import Montserrat from "../fonts/Montserrat/static/Montserrat-Regular.ttf";

const montserrat = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('montserrat'),
    local('montserrat-Regular'),
    url(${Montserrat}) format('woff2')
  `,
};

const montserratBold = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('Raleway'),
    local('Raleway-Bold'),
    url(${MontserratBold}) format('woff2')
  `,
};

export const defaultTheme = createTheme({
  // Color
  primary: {
    standard: "#5DA0C3",
    dark: "#103B4E",
  },

  typography: {
    fontFamily: [
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [montserrat, montserratBold],
      },
    },
  },
});
