import { createTheme } from "@mui/material/styles";
import MontserratBold from "../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf";
import Montserrat from "../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf";
import Kodchasan from "../../assets/fonts/Kodchasan/Kodchasan-Medium.ttf";

const montserrat = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('montserrat'),
    local('montserrat-Regular'),
    url(${Montserrat}) format('ttf')
  `
};

const montserratBold = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 700,
  src: `
    local('montserrat'),
    local('montserrat-Bold'),
    url(${MontserratBold}) format('ttf')
  `
};

const kodchasan = {
  fontFamily: "Kodchasan",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('Kodchasan'),
    local('Kodchasan'),
    url(${Kodchasan}) format('woff2')
  `
};

export const defaultTheme = createTheme({
  // Color
  primary: {
    lighter: "#BEF3FF",
    light: "#7DD8FF",
    standard: "#5DA0C3",
    dark: "#103B4E",
    darker: "",

    contrast: "#5758BB",

    white: "#FFF"
  },
  secondary: {
    lighter: "#bef3ff",
    light: "#7dd8ff",
    standard: "#27B2ED",
    dark: "#0B8AC0",
    darker: ""
  },
  // chart:{
  //   first: 
  // },

  typography: {
    fontFamily: [
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
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [montserrat, montserratBold, kodchasan]
      }
    }
  }
});
