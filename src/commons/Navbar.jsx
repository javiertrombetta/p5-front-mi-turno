"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "@mui/material";
import dataLogout from "@/services/dataLogout";
import { useRouter } from "next/navigation";

const navItems = ["Reservar", "Mis Reservas", "Mi Cuenta", "Cerrar Sesión"];

function Navbar() {
  const router = useRouter();
  const clickLogout = () => {
    dataLogout();
    router.push("/");
  };
  return (
    <AppBar
      position="static"
      component="nav"
      sx={{ backgroundColor: "primary.main" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/">
          <Image src="/img/logo2.png" alt="Logo" height="50" width="40" />
        </Link>

        <Box>
          <Link href="/reservation/process">
            <Button
              variant="contained"
              sx={{
                borderRadius: "15px",
                marginX: "1rem",
                textTransform: "initial",
                bgcolor: "primary.light",
                color: "primary.main",
                ":hover": { bgcolor: "primary.dark", color: "white" },
              }}
            >
              {navItems[0]}
            </Button>
          </Link>
          <Link href="/reservation">
            <Button
              variant="text"
              key={navItems[0]}
              sx={{
                color: "white",
                marginX: "1rem",
                textTransform: "capitalize",
              }}
            >
              {" "}
              <CalendarMonthIcon
                sx={{
                  display: "flex",
                  alignContent: "center",
                  marginLeft: "5px",
                }}
              />
              {navItems[1]}
            </Button>
          </Link>
          <Link href="/user/profile">
            <Button
              variant="text"
              key={navItems[1]}
              sx={{
                color: "white",
                marginX: "1rem",
                textTransform: "capitalize",
              }}
            >
              <AccountCircleIcon
                sx={{
                  display: "flex",
                  alignContent: "center",
                  marginLeft: "5px",
                }}
              />
              {navItems[2]}
            </Button>
          </Link>
          <Button
            onClick={clickLogout}
            variant="text"
            key={navItems[3]}
            sx={{
              color: "white",
              // marginX: "1rem",
              textTransform: "capitalize",
            }}
          >
            <LogoutIcon
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
  );
}

export default Navbar;
