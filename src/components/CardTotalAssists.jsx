import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const CardTotalAssists = ({ metrics, selectedBranchId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalAssists, setTotalAssists] = useState(0);

  useEffect(() => {
    if (selectedBranchId && metrics?.totalAttendances?.[selectedBranchId] !== undefined) {
      setTotalAssists(metrics.totalAttendances[selectedBranchId]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [metrics, selectedBranchId]);

  const displayValue = isLoading ? "Cargando..." : totalAssists;

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
            {totalAssists}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            style={{ color: "white", fontSize: "1rem" }}
          >
            Reservas completadas
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
            <CheckCircleOutlineIcon style={{ fontSize: "4rem" }} />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTotalAssists;

