import * as React from 'react';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';

export default function ReservationDetails({ reservation }) {
  const reservationButtons = ["Editar reserva", "Cancelar reserva"];
  return (
    <Box>
      <Box sx={{ mb: 10 }}>
        <Typography variant="h6" component="div">
          Reserva #{reservation.id}
        </Typography>
        <Typography variant="body1" component="div">
        Hecho el {reservation.fechaCreacion} a las {reservation.horaCreacion} hs. para el día {reservation.fechaReserva} a las {reservation.horaReserva} hs.
        </Typography>
      </Box>    
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Typography variant="body2" textTransform={'uppercase'}>[NOMBRE]</Typography>
          <Typography variant="body1">Mail: {reservation.mailCliente}</Typography>
          <Typography variant="body1">Teléfono: {reservation.telefonoCliente}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2">RESERVA</Typography>
          <Typography variant="body1">Sucursal: {reservation.nombreSucursal}</Typography>
          <Typography variant="body1">Horario: {reservation.horaReserva}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Stack direction="column" spacing={2} sx={{ mt: 2, alignItems: 'flex-end' }}>
            <Button variant="contained" key={reservationButtons[0]} color="primary" fullWidth >
              {reservationButtons[0]}
            </Button>
            <Button variant="outlined" color="error" fullWidth sx={{ color: 'error.main', ':hover': { bgcolor: 'error.dark', color: 'white', borderColor:'error.dark' } }}>
              {reservationButtons[1]}
            </Button> 
          </Stack>
        </Grid>
      </Grid>      
    </Box>
  );
}



