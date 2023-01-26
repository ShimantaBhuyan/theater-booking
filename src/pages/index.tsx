import Head from "next/head";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cinema Booking App</title>
        <meta name="description" content="A sample app to showcase an online cinema booking application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-10">
          <h1 className="text-3xl">Cinema Booking App</h1>
          <Link href="/book" className="px-4 py-2 flex justify-center items-center text-md border-2 rounded-md">
            Book Tickets
          </Link>
          <Link href="/admin" className="px-4 py-2 flex justify-center items-center text-md border-2 rounded-md">
            Admin
          </Link>
        </div>
      </div>
    </>
  );
}
