import "bootstrap/dist/css/bootstrap.css";
import "../styles/animate.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../styles/globals.css";
import { createContext, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout/Layout";
import NextNprogress from "nextjs-progressbar";

export const artistContext = createContext<any>(null);

export default function NextWeb3App({ Component, pageProps }: AppProps) {
  const [global, setGlobal] = useState<any>({
    artist: "",
  });

  const [isLogin, setIsLogin] = useState<any>(false);

  useEffect(() => {
    const initialLS = JSON.parse(localStorage.getItem("artist"));

    const loginToken = JSON.parse(
      localStorage.getItem("login-with-metamask:auth")
    );

    if (initialLS) {
      if (global.artist !== "") {
        localStorage.setItem("artist", JSON.stringify(global.artist));
      }
    }

    if (!initialLS) {
      localStorage.setItem("artist", JSON.stringify(global.artist));
    }

    if (initialLS && global?.artist == "") {
      setGlobal({ artist: initialLS });

      localStorage.setItem("artist", JSON.stringify(initialLS));
    }

    if (loginToken) {
      setIsLogin(true);
    }
  }, [global]);

  return (
    <artistContext.Provider value={{ global, isLogin, setIsLogin, setGlobal }}>
      <Layout>
        <NextNprogress
          color="#18A1FF"
          startPosition={0.3}
          stopDelayMs={200}
          height={6}
        />
        <Component {...pageProps} />
      </Layout>
    </artistContext.Provider>
  );
}
