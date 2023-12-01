import React, { useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Thanks({ email, onPrint }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 100 }} />
      <Typography variant="h3" gutterBottom sx={{ my: 1 }}>
        ¡Gracias por tu reserva!
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
        Revisá tu casilla <Box component="span" sx={{ fontWeight: 'bold' }}>{email}</Box> con todos los detalles de tu reservación.
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        Recordá revisar tu casilla de correo no deseado.
      </Typography>
      <Button 
        onClick={onPrint}
        variant="contained" 
        color="primary" 
        sx={{ my: 5, fontSize: "1.1em", textTransform: "initial", py: 2, px: 10 }}
      >
        ¿Querés imprimir tu comprobante?
      </Button>      
    </Box>
  );
}


