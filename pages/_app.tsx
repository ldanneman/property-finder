import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/index.css';
import { AuthProvider } from 'src/auth/useAuth';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'src/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo();

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>Property Finder</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />;
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
