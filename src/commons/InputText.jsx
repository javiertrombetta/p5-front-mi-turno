import { TextField } from "@mui/material";
import { useState } from "react";

const InputText = ({ label, name, value = "", onChange, disabled = false, margin = "normal", type = "text" }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
    setIsBlurred(true); 
  };

  const handleFocus = () => {
    setIsFocused(true);
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
  };

  const showError = () => {
    return isFocused && isBlurred && value.trim() === "";
  };

  const showHelperText = () => {
    if (showError()) {
      return "Este campo puede estar vacío";
    }
    return "";
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
      onFocus={handleFocus}
      disabled={disabled}
      error={showError()} 
      helperText={showHelperText()}
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