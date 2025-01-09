import Head from "next/head";
import "@/styles/globals.css";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Expressive</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}
