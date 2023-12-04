import { Container } from "@mui/material";
import ProfileContainer from "@/components/ProfileContainer";

const Profile = () => {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "white",
        padding: 3,
      }}
    >
      <ProfileContainer />
    </Container>
  );
};

export default Profile;

