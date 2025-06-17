import { Provider } from "react-redux";
import { store } from "@/store/store"; 
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
       <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;