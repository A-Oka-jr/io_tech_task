import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.css';
import Navbar from '@/components/layout/Layout';
import '/i18n'
import Footer from '@/components/layout/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
