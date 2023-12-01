import * as React from 'react';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';
import dayjs from 'dayjs';

export default function ReservationDetails({ reservation }) {
  const reservationButtons = ["Editar reserva", "Cancelar reserva"];

  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  }

  const formatTime = (time) => {
    return time.replace('::', ':').substring(0, 5);
  }

  return (
    <Box>
      <Box sx={{ mb: 7 }}>
        <Typography variant="h6" component="div">
          Reserva #{reservation.id}
        </Typography>
        <Typography variant="body1" component="div">          
          Hecho el {formatDate(reservation.createdAt)} para el día {formatDate(reservation.date)} a las {formatTime(reservation.time)} hs.
        </Typography>
      </Box>    
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Typography variant="body2">{reservation.clientName}</Typography>
          <Typography variant="body1">Mail: {reservation.clientEmail}</Typography>
          <Typography variant="body1">Teléfono: {reservation.clientPhone}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2">RESERVA</Typography>
          <Typography variant="body1">Sucursal: {reservation.branch.name || 'Nombre no disponible'}</Typography>
          <Typography variant="body1">Horario: {formatTime(reservation.time)}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Stack direction="column" spacing={2} sx={{ mt: 2, alignItems: 'flex-end' }}>
            {reservationButtons.map((buttonLabel, index) => (
              <Button 
                variant={index === 0 ? "contained" : "outlined"} 
                color={index === 0 ? "primary" : "error"}
                fullWidth 
                key={buttonLabel}
              >
                {buttonLabel}
              </Button>
            ))}
          </Stack>
        </Grid>
      </Grid>      
    </Box>
  );
}



