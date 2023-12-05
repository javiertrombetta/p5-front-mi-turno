import React, { useState, useEffect, useCallback } from 'react';
import { TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const InputTime = ({ label, name, value, onChange, min = 0, max = 1440, step = 1 }) => {
  const [intervalId, setIntervalId] = useState(null);

  const modifyValue = useCallback((delta) => {
    const newValue = Math.min(max, Math.max(min, value + delta));
    onChange({ target: { name, value: newValue } });
  }, [value, max, min, onChange, name]);

  const handleMouseDown = (delta) => {
    modifyValue(delta); // Incremento o decremento inicial de 1
    const id = setTimeout(() => {
      clearInterval(id); // Limpia el timeout inicial
      const interval = setInterval(() => modifyValue(delta * 100), 200); // Inicia el intervalo para incrementos/decrementos de 10
      setIntervalId(interval);
    }, 500); // Espera 500ms antes de comenzar los incrementos/decrementos rápidos
  };

  const handleMouseUpOrLeave = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <IconButton
        onMouseDown={() => handleMouseDown(-step)}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        size="small"
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        label={label}
        name={name}
        type="text"
        value={value}
        onChange={() => {}} // Desactivar la entrada manual
        disabled
        style={{ width: '100px' }}
      />
      <IconButton
        onMouseDown={() => handleMouseDown(step)}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        size="small"
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default InputTime;

