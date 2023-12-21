import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { keyframes } from '@mui/system';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }

  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`;

const PopupConfirmDelete = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <CancelIcon 
            sx={{ 
              fontSize: 100, 
              color: 'error.main',
              animation: `${rotate} 2s infinite ease-in-out`
            }} 
          />
        </Box>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            ¿Estás seguro de que quieres eliminar esta reserva?
          </DialogContentText>
        </DialogContent>
        <DialogActions>          
          <Button variant="contained" onClick={onConfirm} color="error" autoFocus>
            Sí, eliminar reserva
          </Button>
          <Button onClick={onClose} color="secondary">
            Volver
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default PopupConfirmDelete;