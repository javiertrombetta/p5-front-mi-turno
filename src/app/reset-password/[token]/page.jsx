"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputPassword from '@/commons/InputPassword';
import Alert from '@/commons/Alert';
import { resetPassword } from "@/services/dataForgotAndResetPassword";

export default function ResetPassword({ params }) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [alert, setAlert] = useState({ open: false, type: 'info', message: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ open: true, type: 'info', message: 'Cambiando la clave...' });
    if (formData.password !== formData.confirmPassword) {
      setAlert({ open: true, type: 'error', message: 'Las contraseñas no coinciden' });
      return;
    }

    try {
      const response = await resetPassword(params.token, formData.password);
      setAlert({ open: true, type: 'success', message: response.message });
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      setAlert({ open: true, type: 'error', message: error.response.data.message || "Ocurrió un error al restablecer la contraseña" });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "5rem" }}>
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>        
        <Typography component="h1" variant="h5">
          Cambiar contraseña
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <InputPassword
            label="Nueva Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputPassword
            label="Confirmar Nueva Contraseña"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 5, mb: 2, p: 2, textTransform: "capitalize" }}
          >
            Cambiar Contraseña
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
            ¿Te acordaste la contraseña? Iniciá Sesión
          </Link>
        </Box>
      </Box>
      <Alert 
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={handleCloseAlert}
      />
    </Container>
  );
}


