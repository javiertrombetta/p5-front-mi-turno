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
import dataNewBusiness from "@/services/dataNewBusiness";
import { useRouter } from "next/navigation";
import Alert from "@/commons/Alert";

function CreateBusiness() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
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
      message: "Creando empresa...",
    });
    try {
      await dataNewBusiness(formData);
      setAlert({
        open: true,
        type: "success",
        message: "¡Empresa creada con éxito!",
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
          Crear Empresa
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 5, mb: 2, py: 2 }}
          >
            Crear Empresa
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

export default CreateBusiness;
