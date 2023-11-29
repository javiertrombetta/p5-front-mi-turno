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
import InputText from "@/commons/InputText";
import InputEmail from "@/commons/InputEmail";
import InputPassword from "@/commons/InputPassword";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import dataRegister from "@/services/dataRegister";
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

  //password check

  const [hasCapital, setHasCapital] = useState(false);
  const pswHasCapital = (str) => {
    return /[A-Z]/.test(str);
  };

  const [hasMinuscule, setHasMinuscule] = useState(false);
  const pswHasMinuscule = (str) => {
    return /[a-z]/.test(str);
  };
  const [hasNumber, setHasNumber] = useState(false);
  const pswHasNumber = (str) => {
    return /\d/.test(str);
  };

  const [has8Caracters, setHas8Caracters] = useState(false);
  const atLeast8Caracters = (str) => {
    return str.length >= 8;
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
    } else if (!pswHasCapital(formData.password)) {
      setHasCapital(true);
    } else if (!pswHasMinuscule(formData.password)) {
      setHasMinuscule(true);
    } else if (!pswHasNumber(formData.password)) {
      setHasNumber(true);
    } else if (!atLeast8Caracters(formData.password)) {
      setHas8Caracters(true);
    } else {
      try {
        await dataRegister(formData);
        alert("Ha sido registrado correctamente.");
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

  // Navegar a la página anterior
  const handleBack = () => {
    router.back();
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          width: "32rem",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          padding: 6,
          borderRadius: 2,
          backgroundColor: "white",
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
              <InputText
                label="Nombre y Apellido"
                fullWidth
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <InputText
                fullWidth
                label="DNI"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <InputEmail
                fullWidth
                label="Correo Electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputPassword
                fullWidth
                label="Contraseña"
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
              <InputPassword
                fullWidth
                label="Repetir Contraseña"
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
              textTransform: "initial",
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
          {hasCapital ? (
            <Alert
              severity="error"
              sx={{ color: "red", backgroundColor: "transparent" }}
            >
              La contraseña debe tener al menos una letra mayúscula
            </Alert>
          ) : (
            ""
          )}
          {hasMinuscule ? (
            <Alert
              severity="error"
              sx={{ color: "red", backgroundColor: "transparent" }}
            >
              La contraseña debe tener al menos una minúscula
            </Alert>
          ) : (
            ""
          )}
          {hasNumber ? (
            <Alert
              severity="error"
              sx={{ color: "red", backgroundColor: "transparent" }}
            >
              La contraseña debe tener al menos un número
            </Alert>
          ) : (
            ""
          )}
          {has8Caracters ? (
            <Alert
              severity="error"
              sx={{ color: "red", backgroundColor: "transparent" }}
            >
              La contraseña debe tener al menos 8 caracteres
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
          <Grid item xs={12} textAlign="center">
            <Button
              variant="text"
              color="primary"
              sx={{ height: "2em", textTransform: "none", marginY: "1rem" }}
              onClick={handleBack}
            >
              Volver
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
