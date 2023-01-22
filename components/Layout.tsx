import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Head>
        <title>StrategyQR | Convert Engage Drive</title>
        <meta name="description" content="QR Code Generator App" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" crossOrigin="anonymous" />
      </Head>
      <Navbar />
      <main className={`${inter.className} main`}>{children}</main>
      <Footer />
    </>
  );
}
