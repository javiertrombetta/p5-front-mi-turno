"use client";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export default function BasicDateCalendar({ selectedBranch }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
      <DateCalendar />
    </LocalizationProvider>
  );
}
