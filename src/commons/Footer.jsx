"use client";
import * as React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body1" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Tu Página
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "30vh",
        justifyContent: "space-between",
        backgroundColor: "transparent",
      }}
    >
      <Box
        component="footer"
        sx={{
          mt: "auto",
        }}
      >
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Copyright />
        </Container>
      </Box>
      <Box
        component="footer"
        sx={{ mt: "auto", display: "flex", marginLeft: "0" }}
      >
        <Container maxWidth="sm" sx={{ py: 3 }}>
          Tenés alguna consulta?
          <Button>
            <WhatsAppIcon sx={{ color: "#7FB7BE" }} />
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
