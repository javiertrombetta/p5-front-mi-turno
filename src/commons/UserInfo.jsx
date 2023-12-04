import { useEffect } from 'react';
import { Typography, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";

const UserInfo = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("No hay usuario. Redirigiendo a login...");
      router.push("/login");
    }
  }, [user, router]);
  
  if (!user) {
    return null;
  }

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  };
  
  const avatarUrl = user.photo || `https://via.placeholder.com/300?text=${getInitials(user.fullName)}`;
  
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

