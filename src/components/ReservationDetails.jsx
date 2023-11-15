import * as React from 'react';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';

export default function ReservationDetails() {
  const db = {}
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" component="div">
        Reserva #1043812955480-01
      </Typography>  
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Typography variant="body1">Ivan Cruce</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">Sucursal: Villa Crespo</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Stack direction="column" spacing={2} sx={{ mt: 2, alignItems: 'flex-end' }}>
            <Button variant="contained" color="primary" fullWidth>
              Editar reserva
            </Button>
            <Button variant="contained" color="error" fullWidth>
              Cancelar reserva
            </Button>
          </Stack>
        </Grid>
      </Grid>      
    </Box>
  );
}



