"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import NavbarDropdown from "@/components/NavbarAdminDropdown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "@mui/material";
import Image from "next/image";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import { useRouter } from "next/navigation";
import dataLogout from "@/services/dataLogout";

const navItems = [
  "Sucursales",
  "Operadores",
  "Reportes",
  "Mi Cuenta",
  "Cerrar Sesión",
];

function NavbarAdmin() {
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
        <NavbarDropdown />

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
              <StoreMallDirectoryIcon
                sx={{
                  display: "flex",
                  alignContent: "center",
                  marginLeft: "5px",
                }}
              />
              {navItems[0]}
            </Button>
          </Link>
          <Link href="#">
            <Button
              variant="text"
              key={navItems[1]}
              sx={{
                color: "white",
                marginX: "1rem",
                textTransform: "capitalize",
              }}
            >
              <SupportAgentIcon
                sx={{
                  display: "flex",
                  alignContent: "center",
                  marginLeft: "5px",
                }}
              />
              {navItems[1]}
            </Button>
          </Link>
          <Link href="#">
            <Button
              variant="text"
              key={navItems[2]}
              sx={{
                color: "white",
                marginX: "1rem",
                textTransform: "capitalize",
              }}
            >
              {" "}
              <DescriptionIcon
                sx={{
                  display: "flex",
                  alignContent: "center",
                  marginLeft: "5px",
                }}
              />
              {navItems[2]}
            </Button>
          </Link>
          <Link href="/profile">
            <Button
              variant="text"
              key={navItems[3]}
              sx={{
                color: "white",
                marginX: "1rem",
                textTransform: "capitalize",
              }}
            >
              {" "}
              <AccountCircleIcon
                sx={{
                  display: "flex",
                  alignContent: "center",
                  marginLeft: "5px",
                }}
              />
              {navItems[3]}
            </Button>
          </Link>
          <Button
            onClick={clickLogout}
            variant="text"
            key={navItems[4]}
            sx={{
              color: "white",
              // marginX: "1rem",
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavbarAdmin;
