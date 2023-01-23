// import { Checkout } from "@components/Checkout";
import dynamic from "next/dynamic";

// const isSSR = () => typeof window === "undefined";

const CheckoutWithNoSSR = dynamic(() => import("@components/Checkout"), { ssr: false });

const CheckoutPage = () => {
  return <CheckoutWithNoSSR />;
};

export default CheckoutPage;
