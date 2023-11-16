import { Typography, CardContent, Card, Avatar } from "@mui/material";

const UserCard = () => {
  // Datos de ejemplo
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    dni: "12345678",
  };
  return (
    <Card sx={{ maxWidth: 400, margin: "auto", marginTop: 2, height: "auto" }}>
      <CardContent sx={{ paddingTop: 2, textAlign: "center" }}>
        <Avatar
          src="/broken-image.jpg" // Reemplaza con la URL real de la imagen
          alt={`${user.firstName} ${user.lastName}'s Avatar`}
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <Typography variant="h6" gutterBottom>
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Email: {user.email}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Teléfono: {user.phone}
        </Typography>
        <Typography color="text.secondary">DNI: {user.dni}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
