'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import InputText from '@/commons/InputText';
import Alert from "@/commons/Alert";
import { getBranchById, updateBranch, deleteBranch } from '@/services/dataBranches';
import ScheduleAndDateDialog from '@/components/PopupDisableDates';
import { generateTimeSlots, formatTime } from '@/utils/time';

const ManageBranches = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [branch, setBranch] = useState(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alertInfo, setAlertInfo] = useState({ open: false, type: 'info', message: '' });

  useEffect(() => {
    const fetchBranch = async () => {
      setLoading(true);
      try {
        const data = await getBranchById(id);
        const formattedData = {
          ...data,
          openingTime: formatTime(data.openingTime),
          closingTime: formatTime(data.closingTime),
        };
        setBranch(formattedData);
      } 
      catch (error) {
        const errorMessage = error.response?.data?.message || 'Error al formatear la fecha y la hora.';
        setAlertInfo({ open: true, type: 'error', message: errorMessage });
      }
      finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchBranch();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBranch({ ...branch, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertInfo({ open: true, type: 'info', message: 'Procesando...' });
    setLoading(true);
    try {
      console.log("Branch:", branch)
      await updateBranch(id, branch);
      setAlertInfo({ open: true, type: 'success', message: 'Sucursal actualizada con éxito.' });
    } 
    catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al actualizar la sucursal.';
      setAlertInfo({ open: true, type: 'error', message: errorMessage });
    }
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteBranch(id);
      setAlertInfo({ open: true, type: 'success', message: 'Sucursal eliminada con éxito.' });
      router.push('/branches');
    } 
    catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al eliminar la sucursal.';
      setAlertInfo({ open: true, type: 'error', message: errorMessage });
    }
    finally {
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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!branch) {
    return <Typography>No se encontró la sucursal.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Gestión de Sucursal</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <InputText label="Nombre" name="name" value={branch.name} onChange={handleInputChange} />
        <InputText label="Email" name="email" value={branch.email} onChange={handleInputChange} />
        <InputText label="Teléfono" name="phoneNumber" value={branch.phoneNumber} onChange={handleInputChange} />
        <InputText label="Dirección" name="address" value={branch.address} onChange={handleInputChange} />
        <InputText label="Capacidad" name="capacity" value={branch.capacity} onChange={handleInputChange} />
        <InputText label="Hora de Apertura" name="openingTime" value={formatTime(branch.openingTime)} onChange={handleInputChange} />
        <InputText label="Hora de Cierre" name="closingTime" value={formatTime(branch.closingTime)} onChange={handleInputChange} />
        <InputText label="Duración del Turno (en minutos)" name="turnDuration" value={branch.turnDuration} onChange={handleInputChange} />
        <FormControl fullWidth margin="normal">
          <InputLabel id="isEnable-label">Habilitada</InputLabel>
          <Select
            labelId="isEnable-label"
            id="isEnable"
            name="isEnable"
            value={branch.isEnable}
            label="Habilitada"
            onChange={handleInputChange}
          >
            <MenuItem value={true}>Sí</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" color="primary" onClick={handleOpenScheduleDialog} sx={{ px: 3, py: 1.5, fontSize: '1rem', mt: 4 }}>
          Gestionar Horarios y Fechas Específicas
        </Button>        
        <Button variant="contained" color="error" onClick={handleDelete} sx={{ px: 3, py: 1.5, fontSize: '1rem', mt: 4, ml: 2 }}>
          Eliminar Sucursal
        </Button>
        <Button variant="contained" color="primary" type="submit" sx={{ px: 3, py: 1.5, fontSize: '1rem', mt: 4, ml: 2 }}>
          Actualizar Sucursal
        </Button>
        <Alert
          open={alertInfo.open}
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={() => setAlertInfo({ ...alertInfo, open: false })}
        />
      </Box>
      <ScheduleAndDateDialog
        open={scheduleDialogOpen}
        onClose={handleCloseScheduleDialog}
        branch={branch}
        setBranch={setBranch}
        generateTimeSlots={generateTimeSlots}
      />
    </Container>
  );  
};

export default ManageBranches;