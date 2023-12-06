import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const CardTotalAssists = ({ metrics, selectedBranchId }) => {
  // Obtener el total de asistencias para la sucursal seleccionada
  const totalAssists = selectedBranchId
    ? metrics?.totalAttendances?.[selectedBranchId] || 0
    : 0;

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
            Total de asistencias
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
            <FontAwesomeIcon icon={faCheck} />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTotalAssists;

