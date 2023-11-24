import { TextField } from "@mui/material";
import { useState } from "react";

const InputEmail = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
  margin = "normal",
}) => {
  const [error, setError] = useState(false);

  const handleBlur = () => {
    setError(value.trim() === "");
  };

  const handleChange = (e) => {
    setError(false);
    if (onChange) onChange(e);
  };

  return (
    <TextField
      fullWidth
      margin={margin}
      label={label}
      name={name}
      type="email"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled}
      error={error}
      helperText={error ? "Este campo no puede estar vacío" : ""}
      FormHelperTextProps={{
        sx: {
          position: "absolute",
          bottom: "-1.5em",
        },
      }}
      sx={{
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover, &:focus-within": {
          transform: disabled ? "none" : "scale(1.02)", // Solo aplica el zoom a los campos habilitados
          boxShadow: disabled ? "none" : "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombra leve al hacer zoom
        },
      }}
    />
  );
};

export default InputEmail;
