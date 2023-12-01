import { Typography, Avatar } from "@mui/material";

const UserInfo = ({ user }) => {
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  };
   
  const avatarUrl =  `https://via.placeholder.com/300?text=${getInitials(user.fullName)}`; // user.photo ||
  
  return (
    <>
      <Avatar
        src={avatarUrl}
        alt={`${user.fullName}'s Avatar`}
        sx={{ width: 300, height: 300, margin: "auto" }}
      />
      <Typography variant="h6" padding="1rem" gutterBottom>
        {user.fullName}
      </Typography>
      <Typography color="text.secondary">D.N.I.: {user.dni}</Typography>
      <Typography color="text.secondary" gutterBottom>
        {user.email}
      </Typography>   
    </>
  );
};

export default UserInfo;
