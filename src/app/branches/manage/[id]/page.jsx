'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import InputText from '@/commons/InputText';
/* import InputNumberSelector from '@/commons/InputNumberSelector';
import InputTimeSelector from '@/commons/InputTimeSelector'; */
import Alert from '@/commons/Alert';
import {
  getBranchById,
  updateBranch,
  deleteBranch,
} from '@/services/dataBranches';
import ScheduleAndDateDialog from '@/components/PopupDisableDates';
import { generateTimeSlots, formatTimeHHMMSS } from '@/utils/time';
import Loader from '@/components/Loader';
import BranchEditForm from '@/components/BranchEditForm';

const ManageBranches = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [branch, setBranch] = useState({
    isEnable: false,
  });
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: '',
  });

  useEffect(() => {
    const initialBranchState = {
      id: '',
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      isEnable: false,
      openingTime: '00:00',
      closingTime: '00:00',
      capacity: 0,
      turnDuration: 0,
    };

    const formatTimeIfNeeded = (timeString) => {
      if (!timeString) return '';
      const isLongFormat = timeString.length === 8;
      return isLongFormat ? formatTimeHHMMSS(timeString) : timeString;
    };

    const fetchBranch = async () => {
      setLoading(true);
      try {
        const data = await getBranchById(id);
        const formattedData = {
          ...data,
          openingTime: formatTimeIfNeeded(data.openingTime),
          closingTime: formatTimeIfNeeded(data.closingTime),
        };

        setBranch(formattedData);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Error al cargar la sucursal.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    id ? fetchBranch() : setBranch(initialBranchState);
  }, [id]);
  const handleBackToList = () => {
    router.push('/branches');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBranch((prevBranch) => ({
      ...prevBranch,
      [name]: value !== undefined ? value : prevBranch[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertInfo({ open: true, type: 'info', message: 'Procesando...' });
    setLoading(true);
    try {
      console.log('SUCURSAL ENVIADA:', branch);
      await updateBranch(id, branch);
      setAlertInfo({
        open: true,
        type: 'success',
        message: 'Sucursal actualizada con éxito.',
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al actualizar la sucursal.';
      setAlertInfo({ open: true, type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteBranch(id);
      setAlertInfo({
        open: true,
        type: 'success',
        message: 'Sucursal eliminada con éxito.',
      });
      router.push('/branches');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al eliminar la sucursal.';
      setAlertInfo({ open: true, type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenScheduleDialog = () => {
    const timeSlots = generateTimeSlots(
      branch.openingTime,
      branch.closingTime,
      parseInt(branch.turnDuration)
    );
    setBranch({ ...branch, timeSlots });
    setScheduleDialogOpen(true);
  };

  const handleCloseScheduleDialog = () => {
    const newTimeSlots = generateTimeSlots(
      branch.openingTime,
      branch.closingTime,
      parseInt(branch.turnDuration)
    );
    setBranch((prevState) => ({
      ...prevState,
      timeSlots: newTimeSlots,
    }));

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

  const handleUpdateBranchFromDialog = (updatedBranch) => {
    setBranch(updatedBranch);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }

  if (!branch) {
    return <Typography>No se encontró la sucursal.</Typography>;
  }

  return (
    <Container>
      <Typography variant='h4' sx={{ mb: 4 }}>
        Gestión de Sucursal
      </Typography>
      <Box component='form' onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <InputText
          label='Número de sucursal'
          name='id'
          value={branch.id}
          onChange={handleInputChange}
          disabled={true}
        />
        <InputText
          label='Nombre'
          name='name'
          value={branch.name}
          onChange={handleInputChange}
        />
        <InputText
          label='Email'
          name='email'
          value={branch.email}
          onChange={handleInputChange}
        />
        <InputText
          label='Teléfono'
          name='phoneNumber'
          value={branch.phoneNumber}
          onChange={handleInputChange}
        />
        <InputText
          label='Dirección'
          name='address'
          value={branch.address}
          onChange={handleInputChange}
        />
        <FormControl fullWidth margin='normal'>
          <InputLabel
            id='isEnable-label'
            style={{ backgroundColor: 'white', paddingRight: '5px' }}
          >
            ¿Sucursal habilitada?
          </InputLabel>
          <Select
            labelId='isEnable-label'
            id='isEnable'
            name='isEnable'
            value={branch.isEnable !== undefined ? branch.isEnable : true}
            label='Habilitada'
            onChange={handleInputChange}
          >
            <MenuItem value={true}>Sí</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <br />
        <BranchEditForm
          branch={branch}
          handleCapacityChange={handleCapacityChange}
          handleTurnDurationChange={handleTurnDurationChange}
          handleOpenScheduleDialog={handleOpenScheduleDialog}
          handleTimeChange={handleTimeChange}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          <Button
            variant='contained'
            color='error'
            onClick={handleDelete}
            sx={{ px: 3, py: 1.5, fontSize: '1rem' }}
          >
            Eliminar Sucursal
          </Button>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            sx={{ px: 3, py: 1.5, fontSize: '1rem' }}
          >
            Actualizar Sucursal
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={handleBackToList}
            sx={{ px: 3, py: 1.5, fontSize: '1rem' }}
          >
            Volver
          </Button>
        </Box>
      </Box>
      <ScheduleAndDateDialog
        open={scheduleDialogOpen}
        onClose={handleCloseScheduleDialog}
        branch={branch}
        setBranch={handleUpdateBranchFromDialog}
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

export default ManageBranches;
