"use client";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link } from "@mui/material";

const dropdownItems = ["Sucursal", "Crear sucursal"];

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Seleccione una opción" }}
        sx={{
          height: "2rem",
          fontSize: "0.8rem",
          borderRadius: "15px",
          marginX: "1rem",
          textTransform: "initial",
          bgcolor: "primary.light",
          color: "primary.main",
          ":hover": { bgcolor: "primary.dark", color: "white" },
        }}
      >
        <MenuItem value="" disabled>
          Seleccione una opción
        </MenuItem>

        <MenuItem value={dropdownItems[0]} component={Link} to="#">
          {dropdownItems[0]}
        </MenuItem>
        <MenuItem value={dropdownItems[1]} component={Link} to="#">
          {dropdownItems[1]}{" "}
        </MenuItem>
      </Select>
    </div>
  );
};

export default Dropdown;
