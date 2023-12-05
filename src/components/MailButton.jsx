import React, { useState } from 'react';
import { Box, Fab, Button, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useTheme } from '@mui/material/styles';
import Grow from '@mui/material/Grow';
import Alert from '@/commons/Alert';
import { sendMessage } from '@/services/dataUser' 

const MailButton = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [alertInfo, setAlertInfo] = useState({ open: false, type: 'info', message: '' });

  const handleClick = () => {
    setOpen(!open);
    setIsEnvelopeOpen(!isEnvelopeOpen);
  };
  const handleSubmit = async () => {
    setAlertInfo({ open: true, type: 'info', message: 'Enviando...' });
    try {
      await sendMessage(userMessage);
      setAlertInfo({ open: true, type: 'success', message: 'Mensaje enviado con éxito.' });
      setUserMessage('');
    } 
    catch (error) {
      setAlertInfo({ open: true, type: 'error', message: error.message || 'Error al enviar el mensaje.' });
    } 
    finally {
      setOpen(false);
      setIsEnvelopeOpen(false);
    }
  };
  return (
    <>
      <Fab 
        color="primary" 
        aria-label="mail" 
        style={{
          position: 'fixed',
          bottom: theme.spacing(5),
          right: theme.spacing(3),
          zIndex: 1000
        }} 
        onClick={handleClick}
      >
        {isEnvelopeOpen ? <MarkEmailReadIcon /> : <EmailIcon />}
      </Fab>
      <Grow in={open} style={{ transitionDelay: open ? '500ms' : '0ms' }}>
        <Box 
          p={2} 
          bgcolor="background.paper" 
          style={{ 
            position: 'fixed', 
            bottom: theme.spacing(12), 
            right: theme.spacing(2), 
            zIndex: 1000,
            width: '20em',
            boxShadow: theme.shadows[5]
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Escribe tu consulta"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </Box>
      </Grow>
      <Alert
        open={alertInfo.open}
        type={alertInfo.type}
        message={alertInfo.message}
        onClose={() => setAlertInfo({ ...alertInfo, open: false })}
      />
    </>
  );
};

export default MailButton;


