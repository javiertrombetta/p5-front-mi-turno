import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChangePasswordForm from "@/components/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",          
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography component="h1" variant="h5" marginBottom="1em">
          Cambiar contraseña
        </Typography>
        <ChangePasswordForm />
      </Box>
    </Container>
  );
};

export default ChangePassword;

