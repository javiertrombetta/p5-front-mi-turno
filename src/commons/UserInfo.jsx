import { Typography, Avatar } from "@mui/material";

const UserInfo = ({ user }) => {
  const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  const avatarUrl = user.avatarUrl || `https://via.placeholder.com/150?text=${getInitials(user.name)}`;

  return (
    <>
      <Avatar
        src={avatarUrl}
        alt={`${user.name}'s Avatar`}
        sx={{ width: 300, height: 300, margin: "auto" }}
      />
      <Typography variant="h6" padding="1rem" gutterBottom>
        {user.name}
      </Typography>
      <Typography color="text.secondary">D.N.I.: {user.dni}</Typography>
      <Typography color="text.secondary" gutterBottom>
        {user.email}
      </Typography>   
    </>
  );
};

export default UserInfo;
