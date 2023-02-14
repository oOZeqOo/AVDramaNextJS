import '../styles/globals.css'
import "../styles/css/all.min.css";
import ConsoleErrorLogger from "../src/components/common/ConsoleErrorLogger";

function MyApp({ Component, pageProps }) {
  return (
    <ConsoleErrorLogger>
      <Component {...pageProps} />
    </ConsoleErrorLogger>
  );
}

export default MyApp
