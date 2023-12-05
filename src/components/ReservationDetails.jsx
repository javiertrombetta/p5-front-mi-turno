import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

export default function ReservationDetails({ reservation }) {
  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  }

  const formatTime = (time) => {
    return time.replace('::', ':').substring(0, 5);
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ mb: 10 }}>
        <Typography variant="h6" component="div">
          Resumen de la reserva #{reservation.id}
        </Typography>
        <Typography variant="body1" component="div">          
          Para más información, QR, y/o imprimir la reserva, accedé al detalle completo.
        </Typography>
      </Box>    
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="body2">SUCURSAL DE RESERVA</Typography>
          <Typography variant="body1">{reservation.branch.name || 'Nombre no disponible'}</Typography>
          <Typography variant="body1">{reservation.branch.address || 'Nombre no disponible'}</Typography>       
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2">PERSONA QUE ASISTE</Typography>
          <Typography variant="body1">{reservation.clientName}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2">FECHA Y HORA DE RESERVA</Typography>
          <Typography variant="body1">{formatDate(reservation.date)}</Typography>
          <Typography variant="body1">{formatTime(reservation.time)}</Typography>
        </Grid>         
      </Grid>      
    </Box>
  );
}




