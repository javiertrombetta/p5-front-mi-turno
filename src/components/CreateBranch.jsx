"use client";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputText from "@/commons/InputText";
import InputEmail from "@/commons/InputEmail";
import InputPassword from "@/commons/InputPassword";
import dataNewBranch from "@/services/dataNewBranch";
import { useRouter } from "next/navigation";
import Alert from "@/commons/Alert";
import { TextField } from "@mui/material";

function CreateBranch() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    capacity: "",
    openingTime: "",
    closingTime: "",
    // turnDuration: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    type: "info",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlert({
      open: true,
      type: "info",
      message: "Creando sucursal...",
    });
    try {
      await dataNewBranch(formData);
      setAlert({
        open: true,
        type: "success",
        message: "¡Sucursal creada con éxito!",
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      let message = "Error al registrar el usuario.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      setAlert({
        open: true,
        type: "error",
        message: message,
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Crear Sucursal
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{ mt: 4, mb: 4 }}
        >
          <InputText
            fullWidth
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <InputEmail
            fullWidth
            label="Correo Electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputText
            fullWidth
            label="Telefono"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <InputText
            fullWidth
            label="Direccion"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <InputText
            type="number"
            fullWidth
            label="Capacidad"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            style={{ position: "absolute", bottom: "-1.5em" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              gap: "10px",
            }}
          >
            <InputText
              label="Horario de apertura"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              sx={{ width: "40%" }}
            />
            <InputText
              fullWidth
              label="Horario de cierre"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              sx={{ width: "40%" }}
            />
          </Box>
          {/* <TextField
            fullWidth
            label="Duración turno"
            name="turnDuration"
            type="number"
            value={formData.turnDuration}
            onChange={handleChange}
            sx={{
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover, &:focus-within": {
                transform: "scale(1.02)", // Solo aplica el zoom a los campos habilitados
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombra leve al hacer zoom
              },
              mt: "1rem",
            }}
          /> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 5, mb: 2, py: 2 }}
          >
            Crear Sucursal
          </Button>
        </Box>
      </Box>
      <Alert
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={handleCloseAlert}
      />
    </Container>
  );
}

export default CreateBranch;
