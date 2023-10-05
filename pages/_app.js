import '../styles/globals.css'
import "../styles/css/all.min.css";
import ConsoleErrorLogger from "../src/components/common/ConsoleErrorLogger";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ConsoleErrorLogger>
      <Head>
        <link
          rel="icon.png"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>

      <Component {...pageProps} />
    </ConsoleErrorLogger>
  );
}

export default MyApp
