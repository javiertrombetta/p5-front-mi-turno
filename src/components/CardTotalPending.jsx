import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PendingIcon from '@mui/icons-material/Pending';

const CardTotalPending = ({ metrics, selectedBranchId }) => {
  const totalPending = selectedBranchId
    ? metrics?.totalPending?.[selectedBranchId] || 0
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
            {totalPending}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            style={{ color: "white", fontSize: "1rem" }}
          >
            Reservas pendientes
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
            <PendingIcon style={{ fontSize: "4rem" }} />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTotalPending;
