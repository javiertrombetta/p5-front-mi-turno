import InputNumberSelector from '@/commons/InputNumberSelector';
import InputTimeSelector from '@/commons/InputTimeSelector';
import { Paper, Box, Button, Typography, Grid } from '@mui/material';
import React from 'react';

const BranchEditForm = ({
  branch,
  handleCapacityChange,
  handleTurnDurationChange,
  handleOpenScheduleDialog,
  handleTimeChange,
}) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        maxWidth: '600px',
        marginTop: '20px',
      }}
    >
      <>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          gap={2}
          sx={{ mt: 4 }}
        >
          <Typography variant='subtitle1' sx={{ width: 'auto' }}>
            Hora de Apertura:
          </Typography>
          <InputTimeSelector
            initialValue={branch.openingTime}
            onChange={(newTime) => handleTimeChange('openingTime', newTime)}
          />
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          gap={2}
          sx={{ mt: 4 }}
        >
          <Typography variant='subtitle1' sx={{ width: 'auto' }}>
            Hora de Cierre:
          </Typography>
          <InputTimeSelector
            initialValue={branch.closingTime}
            onChange={(newTime) => handleTimeChange('closingTime', newTime)}
          />
        </Box>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={6}>
            <Typography variant='subtitle1' sx={{ width: 'auto' }}>
              Capacidad por turno:
            </Typography>
            <InputNumberSelector
              initialValue={branch.capacity}
              onChange={handleCapacityChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1' sx={{ width: 'auto' }}>
              Duración del Turno (en minutos):
            </Typography>
            <InputNumberSelector
              initialValue={parseInt(branch.turnDuration)}
              onChange={handleTurnDurationChange}
            />
          </Grid>
        </Grid>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleOpenScheduleDialog}
          sx={{ px: 3, py: 1.5, fontSize: '1rem', mt: 4 }}
        >
          Gestionar Horarios y Fechas Específicas
        </Button>
      </>
    </Paper>
  );
};

export default BranchEditForm;
