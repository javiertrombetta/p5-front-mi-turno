"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import dataLogout from "@/services/dataLogout";
import { useRouter } from "next/navigation";
import { logoutSuccess } from '@/hooks/slices/authSlice';
import { useDispatch } from 'react-redux';
import { persistor } from '@/hooks/store';

const navItems = ["Reservas", "Mi Cuenta", "Cerrar Sesión"];

function NavbarOp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const clickLogout = async () => {
    try {
      await dataLogout();
      dispatch(logoutSuccess());
      persistor.purge(); 
      router.push("/");
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  return (
    <AppBar
      position="static"
      component="nav"
      sx={{ backgroundColor: "primary.main" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="#">
          <Image src="/img/logo2.png" alt="Logo" height="50" width="40" />
        </Link>

        <Box>
          <Link href="#">
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
              {navItems[0]}
            </Button>
          </Link>
          <Link href="/profile">
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
              {navItems[1]}
            </Button>
          </Link>
          <Button
            onClick={clickLogout}
            variant="text"
            key={navItems[2]}
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

export default NavbarOp;
