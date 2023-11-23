import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useAxios from "@/hooks/useAxios";
import { useState, useEffect } from "react";

export default function BasicSelect() {
  const [branches, setBranches] = useState([]);
  const [sucursal, setSucursal] = useState("");

  const apiUrl = "http://localhost:5000/branches/allBranches";
  const { data, loading, error } = useAxios(apiUrl);

  useEffect(() => {
    if (data) {
      setBranches(data);
    }
  }, [data]);

  const handleChange = (event) => {
    setSucursal(event.target.value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
          {branches.map((branch) => (
            <MenuItem key={branch.id} value={branch.name}>
              {branch.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
