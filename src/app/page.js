"use client";
import React from "react";
import Head from "next/head";
import SignIn from "@/components/Login";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Mi Turno Web App</title>
        <meta name="description" content="Bienvenido" />
      </Head>
      <main>
        <SignIn />
      </main>
    </div>
  );
};

export default Home;
