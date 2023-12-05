import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#9421C3", // Ajusta este color según tu tema
        color: 'white',
        py: 3,
        mt: '5em', // Esto asegura que el footer esté al final de la página
        boxShadow: '0 -1px 8px rgba(0,0,0,0.5)' // Sombra en la parte superior
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" fontSize={13} align="center">
          © Mi Turno Web {new Date().getFullYear()} | Todos los derechos reservados
        </Typography>       
      </Container>
    </Box>
  );
};

export default Footer;

