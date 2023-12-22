"use client";
import React, { useMemo } from "react";
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
import { store } from '@/hooks/store';

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { role: userRole } = useSelector((state) => state.auth.user) || {};

  const navItems = useMemo(() => {
    let items = [];

    switch (userRole) {
      case "user":
      case "oper":
        items = [{ href: "/reservations", icon: <CalendarMonthIcon />, text: "Reservas" }];
        break;
      case "admin":
        items = [
          { href: "/dashboard", icon: <DashboardIcon />, text: "Estadísticas" },          
          { href: "/users", icon: <PeopleIcon />, text: "Operadores" },
          { href: "/branches", icon: <StoreMallDirectoryIcon />, text: "Sucursales" }
        ];
        break;
      case "super":
        items = [
          { href: "/dashboard", icon: <DashboardIcon />, text: "Estadísticas" },
          { href: "/reservations", icon: <CalendarMonthIcon />, text: "Reservas" },
          { href: "/users", icon: <PeopleIcon />, text: "Usuarios" },
          { href: "/companies", icon: <BusinessIcon />, text: "Empresas" },
          { href: "/branches", icon: <StoreMallDirectoryIcon />, text: "Sucursales" }
        ];
        break;
      default:
        break;
    }

    items.push({ href: "/profile", icon: <AccountCircleIcon />, text: "Mi Perfil" });

    return items;
  }, [userRole]);

  const clickLogout = async () => {
    try {
      await dataLogout();
      dispatch(logoutSuccess());
      store.dispatch({ type: 'RESET_APP' });
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ marginLeft: 4, marginY: 1 }}>
          <Link href={userRole === 'super' || userRole === 'admin' ? "/dashboard" : "/reservations"}>
            <Image src="/img/logo2.png" alt="Logo" height="60" width="48" />
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Link href={item.href} key={item.text} sx={{ mx: 2 }}>
              <Button
                variant="text"
                sx={{ color: "white", marginX: "1rem", textTransform: "capitalize" }}
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
            sx={{ color: "white", marginLeft: "1rem", textTransform: "capitalize" }}
          >
            <LogoutIcon sx={{ display: "flex", alignContent: "center", marginLeft: "5px" }} />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

