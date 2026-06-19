import { NavBar } from "@/components/navbar";
import { Toasts } from "@/components/toasts";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const isErrorPage =
    pageProps?.statusCode !== undefined && pageProps.statusCode !== 200;
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  if (isErrorPage) {
    return <Component {...pageProps}></Component>;
  }
  return (
    <>
      <NavBar></NavBar>
      <Component {...pageProps} />
      <Toasts></Toasts>
    </>
  );
}
