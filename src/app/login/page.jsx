import React from "react";
import SignIn from "../../components/Login";
import Navbar from "../../commons/Navbar";
import Footer from "../../commons/Footer";

function Login() {
  return (
    <>
      <Navbar />
      <SignIn />
      <Footer />
    </>
  );
}

export default Login;
