import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

export default function BasicSelect({ times, onChange, value, label, error, helperText }) {
  return (
    <FormControl fullWidth error={error}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {times && times.map((time, index) => (
          <MenuItem key={time} value={time}>
            {time}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}


