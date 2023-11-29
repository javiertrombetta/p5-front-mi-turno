import React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = ({ open, type, message, onClose }) => {
  const validMessage = typeof message === 'string' ? message : 'Ocurrió un error inesperado';
  const messageLines = validMessage.split('\n').map((line, index, array) => (
    <span key={index}>
      {line}
      {index !== array.length - 1 && <br />}
    </span>
  ));
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <MuiAlert 
        elevation={6} 
        variant="filled" 
        onClose={onClose} 
        severity={type} 
        sx={{ width: '100%', whiteSpace: 'pre-line' }}>
        {messageLines}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;

