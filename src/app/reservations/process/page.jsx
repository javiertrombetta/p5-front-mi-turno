import { Container } from "@mui/material";
import Checkout from "../../../components/Checkout";
import Navbar from "@/commons/Navbar";
import Footer from "@/commons/Footer";

const Reservation = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Checkout />
      <Footer />
    </Container>
  );
};

export default Reservation;