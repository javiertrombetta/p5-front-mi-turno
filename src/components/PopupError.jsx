"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  AlertTitle,
} from "@mui/material";
import { useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";

const PopupError = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Error</DialogTitle>

      <DialogTitle>
        <AlertTitle>
          ¡No se pudo realizar la operacion, <br /> intente nuevamente mas
          tarde!
        </AlertTitle>
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupError;
