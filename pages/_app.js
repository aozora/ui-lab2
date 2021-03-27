import '@/styles/globals.scss';
import { Helmet } from 'react-helmet';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Helmet>
        <html lang="en" />
      </Helmet>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
