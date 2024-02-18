import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
