'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import InputText from '@/commons/InputText';
import InputNumberSelector from '@/commons/InputNumberSelector';
import InputTimeSelector from '@/commons/InputTimeSelector'; 
import Alert from "@/commons/Alert";
import { createBranch } from '@/services/dataBranches';
import ScheduleAndDateDialog from '@/components/PopupDisableDates';
import { generateTimeSlots } from '@/utils/time';

const CreateBranches = () => {
  const router = useRouter();
  const [branch, setBranch] = useState({
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    isEnable: false,
    openingTime: '00:00',
    closingTime: '00:00',
    capacity: 0,
    turnDuration: 0
  });
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false, type: 'info', message: '' });

  const handleBackToList = () => {
    router.push("/branches");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'isEnable') {
      setBranch({ ...branch, [name]: value === 'true' });
    } else {
      setBranch({ ...branch, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertInfo({ open: true, type: 'info', message: 'Creando sucursal...' });
    setLoading(true);
    try {
      console.log("CREATE SUCURSAL ENVIADO:", branch);
      await createBranch(branch);
      setAlertInfo({ open: true, type: 'success', message: 'Sucursal creada con éxito.' });
      router.push('/branches');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al crear la sucursal.';
      setAlertInfo({ open: true, type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenScheduleDialog = () => {
    const timeSlots = generateTimeSlots(branch.openingTime, branch.closingTime, parseInt(branch.turnDuration));
    setBranch({ ...branch, timeSlots });
    setScheduleDialogOpen(true);
  };

  const handleCloseScheduleDialog = () => {
    setScheduleDialogOpen(false);
  };

  const handleCapacityChange = (newCapacity) => {
    setBranch({ ...branch, capacity: newCapacity });
  };

  const handleTimeChange = (name, newTime) => {
    setBranch({ ...branch, [name]: newTime });
  };

  const handleTurnDurationChange = (newTurnDuration) => {
    setBranch({ ...branch, turnDuration: newTurnDuration });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Gestión de Sucursal</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>        
        <InputText label="Nombre" name="name" value={branch.name} onChange={handleInputChange} />
        <InputText label="Email" name="email" value={branch.email} onChange={handleInputChange} />
        <InputText label="Teléfono" name="phoneNumber" value={branch.phoneNumber} onChange={handleInputChange} />
        <InputText label="Dirección" name="address" value={branch.address} onChange={handleInputChange} />
        <FormControl fullWidth margin="normal" sx={{ m: 1 }}>
          <InputLabel id="isEnable-label">¿Sucursal habilitada?</InputLabel>
          <Select
            labelId="isEnable-label"
            id="isEnable"
            name="isEnable"
            value={branch.isEnable.toString()}
            label="¿Sucursal habilitada?"
            onChange={handleInputChange}
          >
            <MenuItem value={'true'}>Sí</MenuItem>
            <MenuItem value={'false'}>No</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" alignItems="center" gap={2} sx={{ mt: 4 }}>
          <Typography variant="subtitle1" sx={{ width: 'auto' }}>Hora de Apertura:</Typography>
          <InputTimeSelector 
            initialValue={branch.openingTime} 
            onChange={(newTime) => handleTimeChange('openingTime', newTime)} 
          />
        </Box>
        <Box display="flex" alignItems="center" gap={2} sx={{ mt: 4 }}>
          <Typography variant="subtitle1" sx={{ width: 'auto' }}>Hora de Cierre:</Typography>
          <InputTimeSelector 
            initialValue={branch.closingTime} 
            onChange={(newTime) => handleTimeChange('closingTime', newTime)} 
          />
        </Box> 
        <Box display="flex" alignItems="center" gap={2} sx={{ mt: 4 }}>
          <Typography variant="subtitle1" sx={{ width: 'auto' }}>
            Capacidad por turno:
          </Typography>
          <InputNumberSelector initialValue={branch.capacity} onChange={handleCapacityChange} />
        </Box>
        <Box display="flex" alignItems="center" gap={2} sx={{ mt: 4 }}>
          <Typography variant="subtitle1" sx={{ width: 'auto' }}>
            Duración del Turno (en minutos):
          </Typography>
          <InputNumberSelector 
            initialValue={parseInt(branch.turnDuration)} 
            onChange={handleTurnDurationChange} 
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 5 }}>
          <Button variant="outlined" color="primary" onClick={handleBackToList} sx={{ px: 3, py: 1.5, fontSize: '1rem' }}>
            Volver al Listado
          </Button>
          <Button variant="outlined" color="primary" onClick={handleOpenScheduleDialog} sx={{ px: 3, py: 1.5, fontSize: '1rem' }}>
            Gestionar Horarios y Fechas Específicas
          </Button>        
          <Button variant="contained" color="primary" type="submit" sx={{ px: 3, py: 1.5, fontSize: '1rem'}}>
            Crear Sucursal
          </Button>          
        </Box>
      </Box>
      <ScheduleAndDateDialog
        open={scheduleDialogOpen}
        onClose={handleCloseScheduleDialog}
        branch={branch}
        setBranch={setBranch}
        generateTimeSlots={generateTimeSlots}
      />
      <Alert
        open={alertInfo.open}
        type={alertInfo.type}
        message={alertInfo.message}
        onClose={() => setAlertInfo({ ...alertInfo, open: false })}
      />
    </Container>
  );  
};

export default CreateBranches;