import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const CardPeakTimes = ({ metrics, selectedBranchId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [peakTime, setPeakTime] = useState(null);

  useEffect(() => {
    if (selectedBranchId && metrics?.peakTimes?.[selectedBranchId]) {
      setPeakTime(metrics.peakTimes[selectedBranchId]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [metrics, selectedBranchId]);

  const formattedPeakTime = isLoading ? "Cargando..." : `${peakTime} hs.`;
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
            {peakTime} hs.
          </Typography>
          <Typography
            variant="h6"
            component="p"
            style={{ color: "white", fontSize: "1rem" }}
          >
            Hora pico de asistencia
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
            <AccessTimeIcon style={{ fontSize: "4rem" }} />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPeakTimes;
