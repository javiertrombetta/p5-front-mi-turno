'use client'
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputText from "@/commons/InputText";
import InputEmail from "@/commons/InputEmail";
import InputPassword from "@/commons/InputPassword";
import dataRegister from "@/services/dataRegister";
import { useRouter } from "next/navigation";
import Alert from '@/commons/Alert';
import PasswordRequirements from "./PasswordRequirements";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    dni: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    type: 'info',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlert({
      open: true,
      type: 'info',
      message: 'Registrando el usuario...'
    });
    try {
      await dataRegister(formData);
      setAlert({
        open: true,
        type: 'success',
        message: '¡Registro finalizado! Por favor, verifica tu correo electrónico.'
      });
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      let message = 'Error al registrar el usuario.';
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      setAlert({
        open: true,
        type: 'error',
        message: message
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >       
        <Typography component="h1" variant="h4">
          Registrate
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 4 }}>
          <InputText
            fullWidth
            label="Nombre y Apellido"
            name="fullName"   
            value={formData.fullName}
            onChange={handleChange}
          />
          <InputText
            fullWidth
            label="DNI"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
          />
          <InputEmail
            fullWidth
            label="Correo Electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputText
            fullWidth
            label="Número de Teléfono"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <InputPassword
            fullWidth
            label="Contraseña"
            name="password"    
            value={formData.password}
            onChange={handleChange}            
          />
          {formData.password.length >= 1 ? <PasswordRequirements /> : ""}
          <InputPassword
            fullWidth
            label="Repetir Contraseña"
            name="confirmPassword"  
            value={formData.confirmPassword}
            onChange={handleChange}            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 5, mb: 2, py:2 }}
          >
            Registrarse
          </Button>
          <Link 
            href="/forgot-password" 
            variant="body2" 
            sx={{ 
              
              textDecoration: "none", 
              ':hover': {
                color: 'var(--primary-dark)',
              }
            }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <Link 
            href="/" 
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
            ¿Ya tienes una cuenta? Inicia sesión
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