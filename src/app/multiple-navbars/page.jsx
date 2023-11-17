import React from "react";
import NavbarAdmin from "@/commons/NavbarAdmin";
import NavbarOp from "@/commons/NavbarOp";
import { Box } from "@mui/material";

function NavAdmin() {
  return (
    <>
      <Box sx={{ mb: "3rem" }}>
        <NavbarAdmin />
      </Box>
      <Box>
        <NavbarOp />
      </Box>

      <h2 style={{ textAlign: "center", marginTop: "3rem" }}>
        Hola Facu Velasco, sacate un turno 😉
      </h2>
    </>
  );
}

export default NavAdmin;
