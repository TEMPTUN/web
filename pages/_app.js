import '../styles/globals.css';
import { store } from '../app/store'
import { Provider } from 'react-redux'
import First from '../utils/firstconnect';
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function App({ Component, pageProps,session }) {
  return (
    <GoogleOAuthProvider clientId='750308990397-g8m9euj7lnm3lifufc50rl5b6qv475ev.apps.googleusercontent.com'>
      <Provider store={store}>
        <First/>
       <Component {...pageProps} />
     </Provider> 
    </GoogleOAuthProvider>
  )
}
