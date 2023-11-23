import { TextField } from "@mui/material";
import { useState } from "react";

const InputEmail = ({ label, name, value, disabled = false, margin = "normal" }) => {
  const [error, setError] = useState(false);

  const handleBlur = () => {
    setError(value.trim() === "");
  };

  return (
    <TextField
      fullWidth
      margin={margin}
      label={label}
      name={name}
      type="email"
      value={value}
      onChange={(e) => {
        setError(false);
        onChange(e);
      }}
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
    />
  );
};

export default InputEmail;

