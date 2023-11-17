import { Typography, CardContent, Card, Avatar } from "@mui/material";

const UserCard = () => {
  // Datos de ejemplo
  const user = {
    name: "Carlos Menem",
    email: "carlosmenem@example.com",
    phone: "123-456-7890",
    dni: "12345678",
  };
  return (
    <Card sx={{ maxWidth: 400, margin: "auto", marginTop: 2, height: "auto" }}>
      <CardContent sx={{ paddingTop: 2, textAlign: "center" }}>
        <Avatar
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.lXt4sCOL-C23gIIDRrfAvgHaGL%26pid%3DApi&f=1&ipt=63f163e6fa65c11af583d5482fad7dd9831dfedfc1ff7ad4f813c287a077949e&ipo=images" // Reemplaza con la URL real de la imagen
          alt={`${user.firstName} ${user.lastName}'s Avatar`}
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <Typography variant="h6" gutterBottom>
          {`${user.name}`}
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
