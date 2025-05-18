import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux/languageSlice';
import '../styles/globals.css';
import Navbar from '@/components/layout/Layout';
import '/i18n';
import Footer from '@/components/layout/Footer';
import { useEffect } from 'react';
import i18n from '/i18n';  // Changed from named import to default import

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LanguageInitializer />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

const LanguageInitializer = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Get language from localStorage or browser preference
    const savedLang = localStorage.getItem('lang') || 
                     (navigator.language.startsWith('ar') ? 'ar' : 'en');
    
    // Update state and i18n
    dispatch(setLanguage(savedLang));
    i18n.changeLanguage(savedLang);
    
    // Ensure RTL direction for Arabic
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    
    // Persist to localStorage
    localStorage.setItem('lang', savedLang);
  }, [dispatch]);

  return null;
};

export default MyApp;
