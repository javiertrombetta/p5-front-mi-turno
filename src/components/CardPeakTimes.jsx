import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getMetricsData } from "@/services/dataMetrics";
import CardTotalAssists from "./CardTotalAssists";
import CardTotalReservation from "./CardTotalReservation";

const CardPeakTimes = ({ metrics, selectedBranchId, selectedDate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [peakTime, setPeakTime] = useState(null);
  const [dateMetrics, setDateMetrics] = useState("")

  useEffect(() => {
    if (selectedBranchId && metrics?.peakTimes?.[selectedBranchId]) {
      setPeakTime(metrics.peakTimes[selectedBranchId]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [metrics, selectedBranchId]);

  //agrgado x fran
  useEffect(() => {
    const fetchMetricsData = async () => {
      try {
        const branchId = selectedBranchId;
        
        if (branchId && selectedDate) {
          
          const metricsData = await getMetricsData(branchId, selectedDate);
          setDateMetrics(metricsData || {});
        }
      } catch (error) {
        console.log('Error al obtener métricas: ' + error);
      }
    };
  
    fetchMetricsData();
  }, [selectedBranchId, selectedDate]);
  //sigue lo de javi

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
          {`${peakTime} hs.`} {/* modificado x fran */}
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
