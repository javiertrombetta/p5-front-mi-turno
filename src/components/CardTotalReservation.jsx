import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const CardTotalReservation = ({ metrics, selectedBranchId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalReservations, setTotalReservations] = useState(0);

  useEffect(() => {
    if (selectedBranchId && metrics?.totalReservations?.[selectedBranchId] !== undefined) {
      setTotalReservations(metrics.totalReservations[selectedBranchId]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [metrics, selectedBranchId]);

  const displayValue = isLoading ? "Cargando..." : totalReservations;

  return (
    <Card
      style={{
        borderRadius: "15px",
        borderBottom: `30px solid #9421C3`,
      }}
      sx={{ backgroundColor: "#CC6AFF" }}
    >
      <CardContent style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1, color: "white" }}>
          <Typography variant="h3" component="div">
            {totalReservations}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            style={{ color: "white", fontSize: "1rem" }}
          >
            Reservas totales
          </Typography>
        </div>

        <div>
          <IconButton
            style={{
              fontSize: "4rem",
              border: "none",
            }}
            sx={{ color: "primary.main" }}
          >
            <EditCalendarIcon style={{ fontSize: "4rem" }} />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTotalReservation;

