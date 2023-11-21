"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider, IconButton, InputAdornment, InputLabel } from "@mui/material";
import Input from "@mui/material/Input";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="fullName">Nombre Completo</InputLabel>
              <Input fullWidth id="fullName" type="text" required />
            </Grid>

            <Grid item xs={12}>
              <InputLabel htmlFor="email">Correo Electrónico </InputLabel>
              <Input fullWidth id="email" type="text" required />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="standard-adornment-password">
                Contraseña
              </InputLabel>
              <Input
                fullWidth
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
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
              <InputLabel htmlFor="standard-adornment-password2">
                Repetir contraseña
              </InputLabel>
              <Input
                fullWidth
                id="standard-adornment-password2"
                type={showPassword2 ? "text" : "password"}
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
