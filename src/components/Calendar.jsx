"use client";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

import "dayjs/locale/es-mx";


dayjs.locale("es-mx");

export default function BasicDateCalendar({ setDateSelected, dateSelected }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="es-mx">
      <DateCalendar
        views={["day"]}
        disablePast
        value={dateSelected}
        onChange={setDateSelected}
      />
    </LocalizationProvider>
  );
}