import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  return (
    <AppBar position="static" color="default" sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Button color="inherit" startIcon={<EventSeatIcon />}>
          Reservar
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        <Button color="inherit" endIcon={<EventSeatIcon />}>
          Mis reservas
        </Button>
        <Button color="inherit" endIcon={<AccountCircleIcon />}>
          Mi Cuenta
        </Button>
      </Toolbar>
    </AppBar>
  );
}
