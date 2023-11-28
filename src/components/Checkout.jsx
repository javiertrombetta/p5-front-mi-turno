"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressReservationForm from "./AddresReservationForm";
import BasicSelect from "./SelectForm";
import BasicDateCalendar from "./Calendar";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // traemos las sucursales
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        axios.get("http://localhost:3000/branches/allBranches");
        setBranches([
          { id: 1, name: "Sucursal 1" },
          { id: 2, name: "Sucursal 2" },
          // ... otras sucursales
        ]);
      } catch (error) {
        console.error("Error al cargar las sucursales", error);
      }
    };

    // Llama a la función para cargar las sucursales
    fetchBranches();
  }, []);

  //Nos aseguramos que seleccionamos la sucursal
  useEffect(() => {
    console.log(selectedBranch);
  }, [selectedBranch]);

  const steps = [
    "Seleccione la sucursal",
    "Selecione el día",
    "Complete el formulario",
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <BasicSelect
            branches={branches}
            onBranchSelect={handleBranchSelect}
          />
        );
      case 1:
        return <BasicDateCalendar selectedBranch={selectedBranch} />;
      case 2:
        return <AddressReservationForm />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Hacer una Reserva
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{ justifyContent: "flex-end", pt: 3, pb: 5 }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Gracias por su reserva!
              </Typography>
              <Typography variant="subtitle1">
                El número de su orden es #2001539. Le hemos enviado un mail con
                su confirmación.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Volver
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1
                    ? "Confirmar Reserva"
                    : "Siguiente"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
