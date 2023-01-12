import '../styles/globals.css';
import { store } from '../app/store'
import { Provider } from 'react-redux'
import First from '../utils/firstconnect';
export default function App({ Component, pageProps }) {
  return (
     <Provider store={store}>
        <First/>
       <Component {...pageProps} />
     </Provider> 
  )
}
