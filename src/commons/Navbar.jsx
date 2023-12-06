"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import dataLogout from "@/services/dataLogout";
import { useRouter } from "next/navigation";
import { logoutSuccess } from "@/hooks/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.user?.role);

  let logoLink = "/reservations";
  if (userRole === 'super' || userRole === 'admin') {
    logoLink = "/dashboard";
  }

  const clickLogout = async () => {
    try {
      await dataLogout();
      dispatch(logoutSuccess());
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const renderNavItems = () => {
    let navItems = [];
    switch (userRole) {
      case "user":
      case "oper":
        navItems = [
          { href: "/reservations", icon: <CalendarMonthIcon />, text: "Reservaciones" },
          { href: "/profile", icon: <AccountCircleIcon />, text: "Mi Perfil" },
        ];
        break;
      case "admin":
        navItems = [
          { href: "/dashboard", icon: <DashboardIcon />, text: "Dashboard" },
          { href: "/users", icon: <PeopleIcon />, text: "Operadores" },
          { href: "/reservations", icon: <CalendarMonthIcon />, text: "Reservaciones" },
          { href: "/branches", icon: <StoreMallDirectoryIcon />, text: "Sucursales" },
          { href: "/profile", icon: <AccountCircleIcon />, text: "Mi Perfil" },
        ];
        break;
      case "super":
        navItems = [
          { href: "/dashboard", icon: <DashboardIcon />, text: "Dashboard" },
          { href: "/users", icon: <PeopleIcon />, text: "Usuarios" },
          { href: "/reservations", icon: <CalendarMonthIcon />, text: "Reservaciones" },
          { href: "/companies", icon: <BusinessIcon />, text: "Empresas" },
          { href: "/branches", icon: <StoreMallDirectoryIcon />, text: "Sucursales" },
          { href: "/profile", icon: <AccountCircleIcon />, text: "Mi Perfil" },
        ];
        break;
      default:
        navItems = [];
    }

    return (
      <>
        {navItems.map((item, index) => (
          <Link href={item.href} key={index} sx={{ mx: 2 }}>
            <Button
              variant="text"
              sx={{
                color: "white",
                marginX: "1rem",
                textTransform: "capitalize",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                {item.icon}
                <span style={{ marginLeft: "5px" }}>{item.text}</span>
              </span>
            </Button>
          </Link>
        ))}
        <Button
          onClick={clickLogout}
          variant="text"
          key={navItems[6]}
          sx={{
            color: "white",
            marginLeft: "1rem",
            textTransform: "capitalize",
          }}
        >
          {" "}
          <LogoutIcon
            sx={{
              display: "flex",
              alignContent: "center",
              marginLeft: "5px",
            }}
          />
        </Button>
      </>
    );
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ marginLeft: 4, marginY: 1 }}>
          <Link href={logoLink}>
            <Image src="/img/logo2.png" alt="Logo" height="60" width="48" />
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderNavItems()}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
