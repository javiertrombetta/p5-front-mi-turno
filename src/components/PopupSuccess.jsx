"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PopupSuccess = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Éxito</DialogTitle>

      <DialogTitle>
        <AlertTitle>¡Turno reservado con Exito!</AlertTitle>
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupSuccess;
