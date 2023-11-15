"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9421C3",
      light: "#F6DFFF",
      dark: "#4B0069",
    },   
    secondary: {
      main: "#2196f3",
      light: "#A5DCFF",
      dark: "#005295",
    },
    error: {
      main: "#f44336",
      light: "#FFCDD2",
      dark: "#A91C1C",
    },
    warning: {
      main: "#FDE93D",
      light: "#FFF7B0",
      dark: "#9B8B00",
    },    
    success: {
      main: "#4caf50",
      light: "#C8E6C9",
      dark: "#005814",
    },
  },
  typography: {
    fontFamily: "Poppins, Roboto, Arial, sans-serif",
    h1: {
      fontSize: "4rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "3.5rem",
    },
    h3: {
      fontSize: "3rem",
      fontWeight: "bold",      
    },
    h4: {
      fontSize: "2.5rem",
    },
    h5: {
      fontSize: "2rem",
    },
    h6: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "1rem",
      fontWeight: "bold"
    },    
  },  
});

export default theme;
