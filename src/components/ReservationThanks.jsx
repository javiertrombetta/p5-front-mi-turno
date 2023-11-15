import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Thanks() {
  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 100 }} />
      <Typography variant="h3" gutterBottom sx={{ my: 5}}>
        ¡Gracias por tu reserva!
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ my: 5}}>
        En hasta 5 minutos, recibirás un correo electrónico con todos los detalles de tu reservación.
      </Typography>
      <Button variant="contained" color="primary" sx={{ my: 2, py: 2, px: 10 }}>
        ¿Querés imprimir tu comprobante?
      </Button>

    </Box>
  );
}

