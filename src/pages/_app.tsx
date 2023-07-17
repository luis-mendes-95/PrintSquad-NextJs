import { AuthProvider } from "@/contexts/authContext";
import ServiceOrderProvider from "@/contexts/serviceOrderContext";
import { GlobalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <GlobalStyles/>
      <AuthProvider>
        <ServiceOrderProvider>
          <Component {...pageProps} />
        </ServiceOrderProvider>
      </AuthProvider>
      <ToastContainer/>
    </>
  );
}
