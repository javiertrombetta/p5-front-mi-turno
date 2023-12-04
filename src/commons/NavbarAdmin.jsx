"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import dataLogout from "@/services/dataLogout";
import { useRouter } from "next/navigation";
import { logoutSuccess } from "@/utils/authSlice";
import { useDispatch } from "react-redux";
import { persistor } from "@/utils/store";

const navItems = [
  "Crear Sucursal",
  "Crear Empresa",
  "Sucursales",
  "Operadores",
  "Reportes",
  "Mi Cuenta",
  "Cerrar Sesión",
];

function NavbarAdmin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const clickLogout = async () => {
    try {
      await dataLogout();
      dispatch(logoutSuccess());
      persistor.purge();
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <AppBar
      position="static"
      component="nav"
      sx={{ backgroundColor: "primary.main" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Link href="/user/super/create-branch">
            <Button
              variant="text"
              key={navItems[0]}
              sx={{
                color: "white",
                marginX: "1rem",
                textTransform: "capitalize",
              }}
            >
              {navItems[0]}
            </Button>
          </Link>
          <Link href="/user/super/create-business">
            <Button
              variant="text"
              key={navItems[1]}
              sx={{
                color: "white",
                marginX: "1rem",
                textTransform: "capitalize",
              }}
            >
              {navItems[1]}
            </Button>
          </Link>
        </Box>

        <Box>
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
              <StoreMallDirectoryIcon
                sx={{
                  display: "flex",
                  alignContent: "center",
                  marginLeft: "5px",
                }}
              />
              {navItems[2]}
            </Button>
          </Link>
          <Link href="#">
            <Button
              variant="text"
              key={navItems[3]}
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
              {navItems[3]}
            </Button>
          </Link>
          <Link href="#">
            <Button
              variant="text"
              key={navItems[4]}
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
              {navItems[4]}
            </Button>
          </Link>
          <Link href="/user/profile">
            <Button
              variant="text"
              key={navItems[5]}
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
              {navItems[5]}
            </Button>
          </Link>
          <Button
            onClick={clickLogout}
            variant="text"
            key={navItems[6]}
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
