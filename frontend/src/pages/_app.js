import { ContextProvider } from "@/components/utils/context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (<ContextProvider><Component {...pageProps} /></ContextProvider>);
}
