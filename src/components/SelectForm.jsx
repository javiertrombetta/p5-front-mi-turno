import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function BasicSelect({ branches, onBranchSelect }) {
  const handleSelectChange = (event) => {
    const selectedBranchId = event.target.value;
    const selectedBranch =
      branches.find((branch) => branch.id === selectedBranchId) || null;
    console.log(selectedBranch);
    onBranchSelect(selectedBranch);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sucursal</InputLabel>
        <Select label="Seleccione la sucursal" onChange={handleSelectChange}>
          {branches ? (
            branches.map((branch) => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Loading...</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
