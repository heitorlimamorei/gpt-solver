import "../styles/globals.css";
import { AppContextProvider } from "../data/context/AppContext";
import { SessionProvider } from "next-auth/react"
function MyApp({ Component,  pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  );
}
export default MyApp;
