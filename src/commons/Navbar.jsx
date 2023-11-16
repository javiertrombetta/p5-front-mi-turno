import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import Image from "next/image";

const navItems = ["Reservar", "Mis Reservas", "Mi Cuenta"];

function Navbar() {
  return (   
      <AppBar position="static" component="nav" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/" passHref>  
            <Image src="/img/logo.png" alt="Logo" height="60" width="60" />  
        </Link>               
          <Box>
            <Button variant="text" key={navItems[0]} sx={{ color: "white", marginX: "1rem", textTransform: "capitalize" }}>
              {navItems[0]}
              <CalendarMonthIcon sx={{ display: "flex", alignContent: "center", marginLeft: "5px" }} />
            </Button>
            <Button variant="text" key={navItems[0]} sx={{ color: "white", marginX: "1rem", textTransform: "capitalize" }}>
              {navItems[1]}
              <CalendarMonthIcon sx={{ display: "flex", alignContent: "center", marginLeft: "5px" }} />
            </Button>
            <Button variant="text" key={navItems[1]} sx={{ color: "white", marginX: "1rem", textTransform: "capitalize" }}>
              {navItems[2]}
              <AccountCircleIcon sx={{ display: "flex", alignContent: "center", marginLeft: "5px" }} />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar;
