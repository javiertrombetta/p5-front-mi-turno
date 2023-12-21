import { Box, Typography } from "@mui/material";
import React from "react";

function PasswordRequirements() {
  return (
    <Box
      sx={{
        width: "26rem",
        // padding: "3px",
        border: "1px solid grey",
        borderRadius: "5px",
        backgroundColor: "#E6E6EA",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        margin: "auto",
      }}
    >
      <ul>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            gap: "1.8rem",
            margin: "5px",
          }}
        >
          <li>
            <Typography variant="body1">Al menos 1 mayúscula</Typography>
          </li>
          <li>
            <Typography variant="body1">Al menos 1 minúscula</Typography>
          </li>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            gap: "1.8rem",
            margin: "5px",
          }}
        >
          <li>
            <Typography variant="body1">Al menos 1 nùmero</Typography>
          </li>
          <li>
            <Typography variant="body1">Al menos 8 caracteres</Typography>
          </li>
        </Box>
      </ul>
    </Box>
  );
}

export default PasswordRequirements;
