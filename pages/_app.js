import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PADs Community</title>
        <meta name="description" content="PADs Community - A platform for designers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
