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
// import { Divider } from "@mui/material";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/me", { withCredentials: true })
//       .then(() => {
//         router.push("/reservation/process");
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
//             value={email}
//             onChange={handleEmail}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Contraseña"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={handlePassword}
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
import { Divider } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:3000/me", { withCredentials: true })
      .then(() => {
        router.push("/reservation/process");
      })
      .catch((error) => {
        console.error("Error al verificar la autenticación:", error);
      });
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/users/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        router.push("/reservation/process");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        setError(
          "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo."
        );
      });
  };

  //password visibility

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
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
