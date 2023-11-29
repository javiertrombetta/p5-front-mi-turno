import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ times, onChange, value, label }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={onChange} label={label}>
          {times.map((time) => (
            <MenuItem key={time.id} value={time.id}>
              {time.timetable}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
