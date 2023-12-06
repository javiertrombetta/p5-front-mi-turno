import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CardAverageCancelations = ({ metrics, selectedBranchId }) => {
  // Obtener el promedio de cancelaciones para la sucursal seleccionada
  const averageCancelations = selectedBranchId
    ? metrics?.averageCancellations?.[selectedBranchId] || 0
    : 0;

  // Convertir a porcentaje y redondear a dos decimales
  const averageCancelationsPercentage = (averageCancelations * 100).toFixed(2);

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
            {averageCancelationsPercentage}%
          </Typography>
          <Typography variant="h6" style={{ color: "white", fontSize: "1rem" }}>
            Promedio de cancelaciones
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
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardAverageCancelations;


