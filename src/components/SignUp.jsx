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
import {
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Input from "@mui/material/Input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import dataRegister from "@/app/lib/dataRegister";
import { useRouter } from "next/navigation";

export default function SignUp() {
  //dni input just admit numbers
  // const [dni, setDni] = React.useState("");
  // const handleDniChange = (e) => {
  //   const value = e.target.value;

  //   if (/^\d*$/.test(value)) {
  //     setDni(value);
  //   }
  // };

  //password visibility
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  //user register
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    dni: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [samePasswordAlert, setSamePasswordAlert] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((input) => {
      return { ...input, [name]: value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.dni ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setShowAlert(true);
    } else if (formData.password !== formData.confirmPassword) {
      setSamePasswordAlert(true);
    } else {
      try {
        await dataRegister(formData);
        setFormData({
          fullName: "",
          dni: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setShowAlert(false);
        setSamePasswordAlert(false);
        router.push("/");
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
      }
    }
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Registro
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>Nombre Completo</InputLabel>
              <Input
                fullWidth
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>DNI</InputLabel>
              <Input
                fullWidth
                type="number"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Correo Electrónico </InputLabel>
              <Input
                fullWidth
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Contraseña</InputLabel>
              <Input
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Repetir contraseña</InputLabel>
              <Input
                fullWidth
                type={showPassword2 ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password2 visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword2}
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              marginTop: "1rem",
              textTransform: "capitalize",
              color: "white",
              ":hover": { bgcolor: "primary.dark", color: "white" },
            }}
          >
            Registrarse
          </Button>
          {showAlert ? (
            <Alert
              severity="error"
              sx={{ color: "red", backgroundColor: "transparent" }}
            >
              Debes completar todos los campos
            </Alert>
          ) : (
            ""
          )}
          {samePasswordAlert ? (
            <Alert
              severity="error"
              sx={{ color: "red", backgroundColor: "transparent" }}
            >
              Ambas contraseñas deben ser iguales
            </Alert>
          ) : (
            ""
          )}

          <Divider sx={{ marginBottom: "1rem", marginTop: "1rem" }} />
          <Link href="/">
            <Button
              fullWidth
              variant="contained"
              sx={{
                textTransform: "initial",
                bgcolor: "primary.light",
                color: "primary.main",
                ":hover": {
                  bgcolor: "primary.dark",
                  color: "white",
                },
              }}
            >
              Ya estás registrado? Inicia Sesión
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
