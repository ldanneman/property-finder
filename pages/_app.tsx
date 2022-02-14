import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/index.css';
import { AuthProvider } from 'src/auth/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Property Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}

export default MyApp;
