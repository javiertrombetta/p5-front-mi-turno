"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
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

import Alert from "@/commons/Alert"

import AddressReservationForm from "@/components/AddresReservationForm";
import BasicSelect from "@/components/SelectForm";
import BasicDateCalendar from "@/components/Calendar";
import { useRouter } from "next/navigation";
import currentDate from "@/utils/currentDate";
import dayjs from "dayjs";
import { getBranchesData, getAvailableBranchSchedules } from "@/services/dataBranches";
import { createReservation } from "@/services/dataReservation";

export default function Checkout() {
  const user = useSelector((state) => state.auth.user);
  const [isProcessing, setIsProcessing] = useState(false);
  const [branches, setBranches] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [dateSelected, setDateSelected] = useState(dayjs(currentDate()));
  const [timeSelected, setTimeSelected] = useState("");
  const [clientName, setClientName] = useState(user ? user.fullName : "");
  const [clientEmail, setClientEmail] = useState(user ? user.email : "");
  const [clientPhone, setClientPhone] = useState(user ? user.phoneNumber : "");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: ''
  });
  const router = useRouter();
  
  

  useEffect(() => {
    if (user) {
      setClientName(user.fullName || "");
      setClientEmail(user.email || "");
      setClientPhone(user.phoneNumber || "");
    }
    const fetchBranches = async () => {
      const branchesData = await getBranchesData();
      if (branchesData) {        
        const enabledBranches = branchesData.filter(branch => branch.isEnable);
        const sortedBranches = enabledBranches.sort((a, b) => a.name.localeCompare(b.name));
        setBranches(sortedBranches);
      } else {
        setBranches([]);
      }
    };
  
    fetchBranches();
  }, [availableTimes, user]);


  const handleCloseAlert = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };

  const handleSelectChangeBranch = async (event) => {
    setSelectedBranch(event.target.value);
    setIsNextButtonDisabled(!event.target.value);
    if (dateSelected.isValid()) {
      const schedules = await getAvailableBranchSchedules(event.target.value, dateSelected.format("YYYY-MM-DD"));
      setAvailableTimes(schedules.availableSchedules);
    }
  };
  
  const handleDateChange = async (newValue) => {
    setDateSelected(newValue);
    setIsNextButtonDisabled(newValue.isBefore(dayjs(), 'day'));  
    if (selectedBranch) {
      const checkAvailability = async (date) => {
        const schedules = await getAvailableBranchSchedules(selectedBranch, date.format("YYYY-MM-DD"));
        setAvailableTimes(schedules.availableSchedules);
        return schedules.availableSchedules.length > 0;
      };  
      let availableDate = newValue;
      while (!(await checkAvailability(availableDate)) && availableDate.isBefore(dayjs().add(30, 'day'))) {
        availableDate = availableDate.add(1, 'day');
      }  
      if (await checkAvailability(availableDate)) {
        setDateSelected(availableDate);
        const schedules = await getAvailableBranchSchedules(selectedBranch, availableDate.format("YYYY-MM-DD"));
        setAvailableTimes(schedules.availableSchedules);
      } else {
        setAlertInfo({
          open: true,
          type: 'error',
          message: 'No hay disponibilidad en los próximos 30 días.'
        });
      }
    }
  };
  

  const handleSelectChangeTime = (event) => {
    setTimeSelected(event.target.value);
    setIsNextButtonDisabled(!event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedBranch || !dateSelected || !timeSelected || !clientName || !clientEmail || !clientPhone) {
      setAlertInfo({
        open: true,
        type: 'error',
        message: 'Por favor, completa todos los campos antes de enviar.'
      });
      return;
    }
    setAlertInfo({ open: true, type: 'info', message: 'Procesando...' });
    setIsProcessing(true);
    const reservationData = {
      branchId: selectedBranch,
      date: dateSelected.format("YYYY-MM-DD"),
      time: timeSelected,
      clientName,
      clientEmail,
      clientPhone
    };
  
    try {
      const response = await createReservation(reservationData); 
      setIsProcessing(false);
      setAlertInfo({ open: true, type: 'success', message: 'Reserva creada con éxito' });
      router.push(`/reservations/success-reservation/${response.id}`);
    } 
    catch (error) {
      console.error("Error al crear la reserva:", error);
      setIsProcessing(false);
      setAlertInfo({ open: true, type: 'error', message: error.response?.data?.message || 'Hubo un error al crear la reserva.' });
    }
  };

  const steps = [
    "Seleccione la sucursal",
    "Seleccione el día",
    "Complete el formulario"
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
            times={availableTimes}
            onChangeTime={handleSelectChangeTime}
            valueTime={timeSelected}
            clientName={clientName}
            setClientName={setClientName}
            clientEmail={clientEmail}
            setClientEmail={setClientEmail}
            clientPhone={clientPhone}
            setClientPhone={setClientPhone}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" elevation={0} ></AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Hacer una Reserva
          </Typography>
          <Stepper activeStep={activeStep} sx={{ py: 10}}>
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
                El número de su orden es #2001539. Le hemos enviado un mail con su confirmación.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1, px: 4, py: 2  }}>
                    Volver
                  </Button>
                )}
                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1, px: 4, py: 2 }} disabled={isNextButtonDisabled}>
                  {activeStep === steps.length - 1 ? "Confirmar Reserva" : "Siguiente"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>      
      <Alert
        open={alertInfo.open}
        type={alertInfo.type}
        message={alertInfo.message}
        onClose={handleCloseAlert}
      />
    </React.Fragment>
  );
}

