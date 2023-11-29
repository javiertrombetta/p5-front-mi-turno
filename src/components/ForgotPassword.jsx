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
import { InputLabel } from "@mui/material";
import Input from "@mui/material/Input";
import { forgotPassword } from "@/services/dataForgotAndResetPassword";
import { useState } from "react";

// TODO remove, this demo shouldn't need to reset the theme.

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
      setError("");
    } catch (error) {
      setMessage("");
      setError("El usuario no existe.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "5rem" }}>
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
        <Typography component="h1" variant="h5">
          Reestablecer Contraseña
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="email">Correo Electrónico</InputLabel>
              <Input
                fullWidth
                id="email"
                type="text"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: "1rem",
              textTransform: "capitalize",
              color: "white",
              ":hover": { bgcolor: "primary.dark", color: "white" },
            }}
          >
            Reestablecer Contraseña
          </Button>
        </Box>

        {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
        {error && <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>}
      </Box>
    </Container>
  );
}
