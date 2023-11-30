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
import { useState } from "react";
import currentDate from "@/utils/currentDate";
import dayjs from "dayjs";
import { dataBranches } from "@/services/dataBranches";
import { dataTimes } from "@/services/dataTimes";
import { useRouter } from "next/navigation";

import { createReservation } from "@/services/dataReservation";

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const router = useRouter();

  //Branches
  const [branches, setBranches] = useState(dataBranches);
  const [selectedBranch, setSelectedBranch] = useState("");
  //Date
  const [dateSelected, setDateSelected] = useState(dayjs(currentDate()));
  //times
  const [times, setTimes] = useState(dataTimes);
  const [timeSelected, setTimeSelected] = useState("");

  const handleSelectChangeBranch = (event) => {
    setSelectedBranch(event.target.value);
    setIsNextButtonDisabled(!event.target.value);
  };

  const handleDateChange = (newValue) => {
    setDateSelected(newValue);
    setIsNextButtonDisabled(newValue.isBefore(dayjs(), 'day'));
  };

  const handleSelectChangeTime = (event) => {
    setTimeSelected(event.target.value);
    setIsNextButtonDisabled(!event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedBranch || !dateSelected || !timeSelected) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }  
    const reservationData = {
      branchId: selectedBranch,
      date: dateSelected.format("YYYY-MM-DD"), // Formatea la fecha al formato esperado por el backend
      time: timeSelected // Asegúrate de que este sea el formato de hora esperado por tu backend
    };
  
    try {
      const response = await createReservation(reservationData);
      console.log("Reserva creada con éxito:", response);
      router.push('/reservation/detail');
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      alert("Hubo un error al crear la reserva. Por favor, inténtalo de nuevo.");
    }
  };
  const steps = [
    "Seleccione la sucursal",
    "Selecione el día",
    "Complete el formulario",
  ];
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep(activeStep + 1);
      setIsNextButtonDisabled(true);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <BasicSelect
            branches={branches}
            onChange={handleSelectChangeBranch}
            value={selectedBranch}
            label="Sucursal"
          />
        );
      case 1:
        return (
          <BasicDateCalendar
            setDateSelected={handleDateChange}
            dateSelected={dateSelected}
          />
        );
      case 2:
        return (
          <AddressReservationForm
            times={times}
            onChange={handleSelectChangeTime}
            value={timeSelected}
            label="Horarios"
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  const handleFinalStep = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      handleNext();
    }
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
                <Button variant="contained" onClick={handleFinalStep} sx={{ mt: 3, ml: 1 }} disabled={isNextButtonDisabled}>
                  {activeStep === steps.length - 1 ? "Confirmar Reserva" : "Siguiente"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
