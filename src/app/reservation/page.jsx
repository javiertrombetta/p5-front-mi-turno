import { Container } from "@mui/material";
import Checkout from "../../components/Checkout";
import Navbar from "@/commons/Navbar";
import Footer from "@/commons/Footer";

const Reservation = () => {
  return (
    <Container maxWidth="lg">
      <Checkout />
    </Container>
  );
};

export default Reservation;
