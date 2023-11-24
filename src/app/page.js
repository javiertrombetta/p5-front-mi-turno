"use client";
import React from "react";
import Head from "next/head";
import SignIn from "@/components/Login";
import Provider from "./provider";

const Home = () => {
  return (
    <Provider>
      <Head>
        <title>Home</title>
        <meta name="description" content="Bienvenido" />
      </Head>
      <main>
        <SignIn />
      </main>
    </Provider>
  );
};

export default Home;
