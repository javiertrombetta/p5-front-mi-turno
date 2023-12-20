import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const InputNumberSelector = ({ initialValue = 0, onChange }) => {
  const [value, setValue] = useState(initialValue || 0);
  const isDuration = onChange && initialValue === 0;

  const handleIncrement = () => {
    updateValue(isDuration ? value + 5 : value + 1);
  };

  const handleDecrement = () => {
    updateValue(
      isDuration ? (value >= 5 ? value - 5 : 0) : value > 0 ? value - 1 : 0
    );
  };

  const updateValue = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box display='flex' alignItems='center'>
      <Button onClick={handleDecrement} variant='contained' sx={{ mr: 1 }}>
        {isDuration ? '-5' : '-'}
      </Button>
      <TextField
        type='number'
        value={value}
        inputProps={{ min: 0, readOnly: true }}
        sx={{ width: '5rem' }}
      />
      <Button onClick={handleIncrement} variant='contained' sx={{ ml: 1 }}>
        {isDuration ? '+5' : '+'}
      </Button>
    </Box>
  );
};

export default InputNumberSelector;
