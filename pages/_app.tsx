import Layout from "../components/layouts";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        {/* Adicione elementos globais ao head aqui */}
        <title>Byte Bushido</title>
        <meta
          name="Byte Bushido"
          content="Byte Bushido tutoriais de programação"
        />
      </Head>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
