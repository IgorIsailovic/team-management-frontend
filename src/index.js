import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1F4690",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App></App>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
