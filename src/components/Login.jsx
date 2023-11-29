"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../hooks/slices/userSlice";
import { checkAuth, loginUser } from "../services/dataLogin";
import { setUser } from "../hooks/slices/userSlice";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthAsync = async () => {
      try {
        const userData = await checkAuth(user, dispatch, router);
        if (userData) {
          setTimeout(() => {
            switch (userData.role) {
              case "super":
                router.push("/user/super");
                break;
              case "admin":
                router.push("/user/admin");
                break;
              case "oper":
                router.push("/");
                break;
              case "user":
                router.push("/reservation");
                break;
              default:
                console.error("Rol desconocido");
            }
          }, 700);
        }
      } catch (error) {
        console.error("Error en autenticar:", error);
      }
    };

    checkAuthAsync();
  }, [user, dispatch, router]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(email, password, router, setError);
      dispatch(setUser(userData));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            onChange={handlePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    //onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* <Typography>
              <FormControlLabel
                control={
                  <Checkbox value="remember" color="primary" size="body2" />
                }
                label="Recordarme"
              />
            </Typography> */}

            <Link
              href="/forgot-password"
              variant="body1"
              sx={{ color: "black", textDecoration: "none" }}
            >
              Olvidaste tu contraseña?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              textTransform: "capitalize",
              color: "white",
              ":hover": { bgcolor: "primary.dark", color: "white" },
            }}
          >
            Iniciar Sesión
          </Button>
          <Divider sx={{ marginBottom: "1rem", marginTop: "1rem" }} />
          <Link href="/register">
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
              No tenés cuenta? Registrate
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
