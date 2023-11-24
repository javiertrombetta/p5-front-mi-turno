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
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",    
          padding: 6, 
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

