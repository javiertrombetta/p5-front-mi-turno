"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect() {
  const [sucursal, setSucursal] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sucursal</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sucursal}
          label="Sucursal"
          onChange={handleChange}
        >
          <MenuItem value="sucursal1">sucursal 1</MenuItem>
          <MenuItem value="sucursal2">sucursal 2</MenuItem>
          <MenuItem value="sucursal3">sucursal 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
