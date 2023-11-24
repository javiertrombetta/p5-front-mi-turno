import { TextField, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { keyframes } from "@emotion/react";

const shakeAnimation = keyframes`
  0% { transform: translateX(0px); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  100% { transform: translateX(0px); }
`;

const InputPassword = ({
  label = "Contraseña",
  name,
  value,
  onChange,
  error,
  helperText,
  margin = "dense",
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TextField
      fullWidth
      margin={margin}
      label={label}
      name={name}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover, &:focus-within": {
          transform: disabled ? "none" : "scale(1.02)",
          boxShadow: disabled ? "none" : "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
        ...(error && {
          animation: `${shakeAnimation} 0.5s ease`,
        }),
      }}
      FormHelperTextProps={{
        sx: {
          position: "absolute",
          bottom: "-1.5em",
        },
      }}
    />
  );
};

export default InputPassword;
