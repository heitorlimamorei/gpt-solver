import "../styles/globals.css";
import { AppContextProvider } from "../data/context/AppContext";
import {SheetContextProvider} from "../data/context/SheetContext"
import { SessionProvider } from "next-auth/react"
function MyApp({ Component,  pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <SheetContextProvider>
        <Component {...pageProps} />
        </SheetContextProvider>
      </AppContextProvider>
    </SessionProvider>
  );
}
export default MyApp;
