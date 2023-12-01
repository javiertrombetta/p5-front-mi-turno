import { TextField } from "@mui/material";
import { useState } from "react";

const InputText = ({ label, name, value, onChange, disabled = false, margin = "normal", type = "text" }) => {
  const [error, setError] = useState(false);

  const handleBlur = () => {
    setError((value ?? "").trim() === "");
  };

  const handleChange = (e) => {
    if (type === 'tel') {
      const newValue = e.target.value;
      if (/^\d*$/.test(newValue)) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
    setError(false);
  };

  return (
    <TextField
      fullWidth
      margin={margin}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled}
      error={error}
      helperText={error ? "Este campo no puede estar vacío" : ""}
      FormHelperTextProps={{
        sx: {
          position: 'absolute',
          bottom: '-1.5em',
        }
      }}
      sx={{
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover, &:focus-within": {
          transform: disabled ? "none" : "scale(1.02)",
          boxShadow: disabled ? "none" : "0px 4px 12px rgba(0, 0, 0, 0.1)",        
        },
      }}
    />
  );
};

export default InputText;