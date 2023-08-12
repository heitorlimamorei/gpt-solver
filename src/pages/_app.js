import "../styles/globals.css";
import { AppContextProvider } from "../data/context/AppContext";
import {SheetContextProvider} from "../data/context/SheetContext"
import {AuthContextProvider} from "../data/context/AuthContext"
import { SessionProvider } from "next-auth/react"
function MyApp({ Component,  pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <AuthContextProvider>
        <SheetContextProvider>
        <Component {...pageProps} />
        </SheetContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </SessionProvider>
  );
}
export default MyApp;
