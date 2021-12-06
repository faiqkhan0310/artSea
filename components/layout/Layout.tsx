import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import Head from "next/head";
export function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ArtSea</title>
        {/* <link rel="icon" href="/favicon.png" /> */}
      </Head>
      <Navbar></Navbar>
      <div className="main-rapper-col">{children}</div>
      <Footer></Footer>
    </div>
  );
}
