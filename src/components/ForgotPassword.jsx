"use client";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputEmail from '@/commons/InputEmail';
import Alert from '@/commons/Alert';
import { useRouter } from 'next/navigation';
import { forgotPassword } from "@/services/dataForgotAndResetPassword";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ open: false, type: 'info', message: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ open: true, type: 'info', message: 'Enviando correo de recuperación de contraseña...' });
    try {
      const response = await forgotPassword(email);
      setAlert({ open: true, type: 'success', message: response.message });
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      setAlert({ open: true, type: 'error', message: error.response.data.message || "Ocurrió un error" });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "5rem" }}>
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar sx={{ mb: 2, p: 4, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Restablecer Contraseña
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <InputEmail
            label="Correo Electrónico"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 5, mb: 2, py: 2, textTransform: "capitalize" }}
          >
            Restablecer Contraseña
          </Button>
          <Link 
            href="/" 
            variant="body2" 
            sx={{ 
              textDecoration: "none", 
              ':hover': {
                color: 'var(--primary-dark)',
              }
            }}
          >
            ¿Te acordás tu contraseña? Inicia sesión
          </Link>
          <Link 
            href="/register" 
            variant="body2" 
            sx={{ 
              textDecoration: "none", 
              display: "block", 
              mt: 2, 
              ':hover': {
                color: 'var(--primary-dark)',
              }
            }}
          >
            ¿No tenés cuenta? Registrate
          </Link>
        </Box>
      </Box>
      <Alert open={alert.open} type={alert.type} message={alert.message} onClose={handleCloseAlert} />
    </Container>
  );
}