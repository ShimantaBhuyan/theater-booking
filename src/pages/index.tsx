import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@styles/Home.module.css";

import Link from "next/link";
import { useEffect } from "react";
import { Seat, useSeatStore } from "@store/store";
import { SBClient } from "../../utils/SBClient";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { setCinemaLayout, setSeats } = useSeatStore();
  const supabase = SBClient.getInstance();

  useEffect(() => {
    const getDBValues = async () => {
      const rowsData = await supabase.fetchRows();
      const seatsData = await supabase.fetchSeats();
      // TODO: Toasts
      if (rowsData.success) {
        setCinemaLayout({ rows: rowsData.data?.data as Array<{ id: string; numCols: number; price: number }> });
      } else {
        console.log("Failed to load cinema layout...");
      }
      if (seatsData.success) {
        setSeats(seatsData.data?.data as Seat[]);
      } else {
        console.log("Failed to load seats for cinema...");
      }
    };
    // if (seats && seats.length === 0) getDBValues();
    getDBValues();
  }, []);

  return (
    <>
      <Head>
        <title>Cinema Booking App</title>
        <meta name="description" content="A sample app to showcase an online cinema booking application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center">
        {/* <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div> */}

        <div className="flex flex-col justify-center items-center gap-10">
          <h1 className="text-3xl">Cinema Booking App</h1>
          <Link href="/book" className="px-4 py-2 flex justify-center items-center text-md border-2 rounded-md">
            Book Tickets
          </Link>
          <Link href="/admin" className="px-4 py-2 flex justify-center items-center text-md border-2 rounded-md">
            Admin
          </Link>
        </div>

        {/* <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div> */}
      </div>
    </>
  );
}
