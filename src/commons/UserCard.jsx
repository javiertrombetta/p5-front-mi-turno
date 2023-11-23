import { Card, CardContent } from "@mui/material";

const GenericCard = ({ children, sx }) => (
  <Card sx={{ width:"25em",maxWidth: "25em", paddingTop:"1em", margin: "auto", ...sx }}>
    <CardContent sx={{ textAlign: "center" }}>
      {children}
    </CardContent>
  </Card>
);

export default GenericCard;
