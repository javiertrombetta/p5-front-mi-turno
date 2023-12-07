import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, ListItemText } from '@mui/material';
/*
const initialBranchState = {
  schedule: [],
  specificDates: [],
};
*/
const ScheduleAndDateDialog = ({ open, onClose, branch, setBranch, generateTimeSlots }) => {
  const [localBranch, setLocalBranch] = useState({
    schedule: branch?.schedule || [],
    specificDates: branch?.specificDates || []
  });

  useEffect(() => {    
    setLocalBranch({
      schedule: branch?.schedule || [],
      specificDates: branch?.specificDates || []
    });
  }, [branch]);

  const updateBranchState = (updatedBranch) => {
    setLocalBranch(updatedBranch);
    setBranch(updatedBranch);
  };

  const handleScheduleItemChange = (index, key, value) => {
    const updatedSchedule = localBranch.schedule.map((item, i) => {
      if (i === index) {
        return { ...item, [key]: value };
      }
      return item;
    });
    updateBranchState({ ...localBranch, schedule: updatedSchedule });
  };

  const handleRemoveScheduleItem = (index) => {
    const updatedSchedule = localBranch.schedule.filter((_, i) => i !== index);
    updateBranchState({ ...localBranch, schedule: updatedSchedule });
  };

  const handleAddScheduleItem = () => {
    const newScheduleItem = { day: 'Lunes', disabledHours: [] };
    updateBranchState({ ...localBranch, schedule: [...localBranch.schedule, newScheduleItem] });
  };

  const handleSelectAllHours = (index) => {
    const allHours = generateTimeSlots(branch.openingTime, branch.closingTime, parseInt(branch.turnDuration));
    const updatedSchedule = localBranch.schedule.map((item, i) => {
      if (i === index) {
        return { ...item, disabledHours: allHours };
      }
      return item;
    });
    updateBranchState({ ...localBranch, schedule: updatedSchedule });
  };

  const handleSpecificDateChange = (index, key, value) => {
    const updatedSpecificDates = localBranch.specificDates.map((item, i) => {
      if (i === index) {
        return { ...item, [key]: value };
      }
      return item;
    });
    updateBranchState({ ...localBranch, specificDates: updatedSpecificDates });
  };

  const handleRemoveSpecificDate = (index) => {
    const updatedSpecificDates = localBranch.specificDates.filter((_, i) => i !== index);
    updateBranchState({ ...localBranch, specificDates: updatedSpecificDates });
  };

  const handleAddSpecificDate = () => {
    const newSpecificDate = { date: new Date().toISOString().slice(0, 10), isDisabled: true };
    updateBranchState({ ...localBranch, specificDates: [...localBranch.specificDates, newSpecificDate] });
  };

  const handleCloseDialog = () => {
    onUpdateBranch(localBranch);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle>
          Gestión de fechas y horas deshabilitadas   
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mt: 3, mb: 2 }}>Horarios Deshabilitados</Typography>
        {localBranch.schedule.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FormControl sx={{ mr: 2, minWidth: 120 }}>
              <InputLabel>Día</InputLabel>
              <Select
                value={item.day}
                onChange={(e) => handleScheduleItemChange(index, 'day', e.target.value)}
              >
                <MenuItem value="Lunes">Lunes</MenuItem>
                <MenuItem value="Martes">Martes</MenuItem>
                <MenuItem value="Miércoles">Miércoles</MenuItem>
                <MenuItem value="Jueves">Jueves</MenuItem>
                <MenuItem value="Viernes">Viernes</MenuItem>
                <MenuItem value="Sábado">Sábado</MenuItem>
                <MenuItem value="Domingo">Domingo</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 300, maxWidth: 300 }}>
              <InputLabel>Horas Deshabilitadas</InputLabel>
              <Select
                multiple
                value={item.disabledHours}
                onChange={(e) => handleScheduleItemChange(index, 'disabledHours', e.target.value)}
                renderValue={(selected) => selected.join(', ')}
              >
                {generateTimeSlots(branch.openingTime, branch.closingTime, parseInt(branch.turnDuration)).map(time => (
                  <MenuItem key={time} value={time}>
                    <Checkbox checked={item.disabledHours.includes(time)} />
                    <ListItemText primary={time} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={() => handleSelectAllHours(index)}>Seleccionar Todo</Button>
            <Button onClick={() => handleRemoveScheduleItem(index)}>Eliminar</Button>
          </Box>
        ))}
        <Button onClick={handleAddScheduleItem}>Agregar Horario Deshabilitado</Button>

        <Typography variant="body2" sx={{ mt: 3, mb: 2 }}>Fechas Específicas</Typography>
        {localBranch.specificDates.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              label="Fecha"
              type="date"
              sx={{ mr: 2 }}
              value={item.date}
              onChange={(e) => handleSpecificDateChange(index, 'date', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />    
            <Button onClick={() => handleRemoveSpecificDate(index)}>Eliminar</Button>
          </Box>
        ))}
        <Button onClick={handleAddSpecificDate}>Agregar Fecha Específica</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleAndDateDialog;