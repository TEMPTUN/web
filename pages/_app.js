import '../styles/globals.css';
import { store } from '../app/store'
import { Provider, useSelector } from 'react-redux'
import First from '../utils/firstconnect';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import Head from 'next/head';


export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId='750308990397-g8m9euj7lnm3lifufc50rl5b6qv475ev.apps.googleusercontent.com'>
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,500;1,600&family=Ubuntu&family=VT323&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet" /> 
      </Head>
      <Provider store={store}>
        <First/>
       <Component {...pageProps} />
     </Provider> 
    </GoogleOAuthProvider>
  )
}
