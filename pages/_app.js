import React from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
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
      
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
