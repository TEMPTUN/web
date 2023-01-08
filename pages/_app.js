import '../styles/globals.css';
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import {useSelector,useDispatch } from 'react-redux';
import First from '../component/FirstRun/First';
export default function App({ Component, pageProps }) {

  return (
     <Provider store={store}>
        <First/>
       <Component {...pageProps} />
     </Provider> 
  )
}
