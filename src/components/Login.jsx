// "use client";
// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { Divider, InputAdornment, IconButton } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const router = useRouter();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/me", { withCredentials: true })
//       .then((response) => {
//         const userData = response.data;

//         if (userData.dni) {
//           router.push("/reservation/my");
//         } else {
//           console.error("Usuario no autenticado");
//         }
//       })
//       .catch((error) => {
//         console.error("Error al verificar la autenticación:", error);
//       });
//   }, []);

//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post(
//         "http://localhost:3000/users/login",
//         {
//           email: email,
//           password: password,
//         },
//         {
//           withCredentials: true,
//         }
//       )
//       .then(() => {
//         router.push("/reservation/process");
//       })
//       .catch((error) => {
//         console.error("Error al iniciar sesión:", error);
//         setError(
//           "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo."
//         );
//       });
//   };

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   return (
//     <Container component="main" maxWidth="xs" sx={{ marginTop: "5rem" }}>
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Iniciar Sesión
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Correo Electrónico"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             onChange={handleEmail}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Contraseña"
//             type={showPassword ? "text" : "password"}
//             id="password"
//             autoComplete="current-password"
//             onChange={handlePassword}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleClickShowPassword}>
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           {error && (
//             <Typography variant="body2" color="error" sx={{ mt: 1 }}>
//               {error}
//             </Typography>
//           )}
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography>
//               <FormControlLabel
//                 control={
//                   <Checkbox value="remember" color="primary" size="body2" />
//                 }
//                 label="Recordarme"
//               />
//             </Typography>

//             <Link
//               href="#"
//               variant="body1"
//               sx={{ color: "black", textDecoration: "none" }}
//             >
//               Olvidaste tu contraseña?
//             </Link>
//           </Box>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{
//               textTransform: "capitalize",
//               color: "white",
//               ":hover": { bgcolor: "primary.dark", color: "white" },
//             }}
//           >
//             Iniciar Sesión
//           </Button>
//           <Divider sx={{ marginBottom: "1rem", marginTop: "1rem" }} />
//           <Link href="/register">
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 textTransform: "initial",
//                 bgcolor: "primary.light",
//                 color: "primary.main",
//                 ":hover": {
//                   bgcolor: "primary.dark",
//                   color: "white",
//                 },
//               }}
//             >
//               No tenés cuenta? Registrate
//             </Button>
//           </Link>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
import { checkAuth, loginUser } from "../app/lib/dataLogin";
import { setUser } from "../hooks/slices/userSlice";
import InputEmail from "@/commons/InputEmail";
import InputPassword from "@/commons/InputPassword";

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
        await checkAuth(user, dispatch, router);
      } catch (error) {
        console.error("Error en checkAuth:", error);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = loginUser(email, password, router, setError);
    dispatch(setUser(userData));
    //router.push("/reservation/process");
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
            <Typography>
              <FormControlLabel
                control={
                  <Checkbox value="remember" color="primary" size="body2" />
                }
                label="Recordarme"
              />
            </Typography>

            <Link
              href="#"
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
