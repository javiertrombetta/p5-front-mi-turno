"use client";

import {
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

const PopupEditSuccess = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Error</DialogTitle>

      <DialogTitle>
        <AlertTitle>¡Turno modificado con éxito!</AlertTitle>
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupEditSuccess;
