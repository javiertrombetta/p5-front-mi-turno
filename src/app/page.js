import React from 'react';
import Head from 'next/head';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Bienvenido" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Home</h1>
      </main>      
    </div>
  );
};

export default Home;