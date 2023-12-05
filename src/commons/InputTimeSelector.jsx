import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const InputTimeSelector = ({ initialValue = "00:00", onChange }) => {
  const [time, setTime] = useState(initialValue);

  const incrementHours = () => {
    const [hours, minutes] = time.split(':').map(Number);
    updateTime((hours + 1) % 24, minutes);
  };

  const decrementHours = () => {
    const [hours, minutes] = time.split(':').map(Number);
    updateTime((hours - 1 + 24) % 24, minutes);
  };

  const incrementMinutes = () => {
    const [hours, minutes] = time.split(':').map(Number);
    updateTime(hours, (minutes + 1) % 60);
  };

  const decrementMinutes = () => {
    const [hours, minutes] = time.split(':').map(Number);
    updateTime(hours, (minutes - 1 + 60) % 60);
  };

  const updateTime = (newHours, newMinutes) => {
    const newTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    setTime(newTime);
    if (onChange) {
      onChange(newTime);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Button onClick={incrementHours} variant="contained" sx={{ mr: 1 }}>+ Horas</Button>
      <Button onClick={decrementHours} variant="contained" sx={{ mr: 1 }}>- Horas</Button>
      <TextField
        type="text"
        value={time}
        inputProps={{ readOnly: true }}
        sx={{ width: '6rem', textAlign: 'center' }}
      />
      <Button onClick={incrementMinutes} variant="contained" sx={{ ml: 1 }}>+ Minutos</Button>
      <Button onClick={decrementMinutes} variant="contained" sx={{ ml: 1 }}>- Minutos</Button>
    </Box>
  );
};

export default InputTimeSelector;


