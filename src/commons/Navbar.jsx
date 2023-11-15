import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Fab } from "@mui/material";

const navItems = ["Mis Reservas", "Mi Cuenta", "Reservar"];

function Navbar() {
  return (
    <Box sx={{ marginBottom: "5rem" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "tertiary.main" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          ></IconButton>
          <Fab
            variant="extended"
            size="small"
            sx={{
              color: "#fff",
              textTransform: "capitalize",
              padding: "0.8rem",
              fontFamily: "monospace",
              "&:hover": {
                backgroundColor: "#fff",
                color: "tertiary.main",
              },
            }}
          >
            {navItems[2]}
          </Fab>
          <Button
            sx={{
              color: "#fff",
              display: "flex",
              alignContent: "center",
              marginLeft: "5rem",
            }}
          >
            <HomeIcon />
          </Button>

          <Box>
            <Button
              variant="text"
              key={navItems[0]}
              sx={{
                color: "#fff",
                marginRight: "0.5rem",
                color: "#fff",
                textTransform: "capitalize",
                fontFamily: "monospace",
                fontSize: "0.9rem",
              }}
            >
              {navItems[0]}
              <CalendarMonthIcon
                sx={{
                  display: "flex",
                  alignContent: "center",
                  marginLeft: "5px",
                }}
              />
            </Button>
            <Button
              variant="text"
              key={navItems[1]}
              sx={{
                color: "#fff",
                marginRight: "0.5rem",
                color: "#fff",
                textTransform: "capitalize",
                fontFamily: "monospace",
                fontSize: "0.9rem",
              }}
            >
              {navItems[1]}
              <AccountCircleIcon
                sx={{
                  display: "flex",
                  alignContent: "center",
                  marginLeft: "5px",
                }}
              />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
