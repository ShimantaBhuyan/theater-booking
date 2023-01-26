import dynamic from "next/dynamic";

const CheckoutWithNoSSR = dynamic(() => import("@components/Checkout"), { ssr: false });

const CheckoutPage = () => {
  return <CheckoutWithNoSSR />;
};

export default CheckoutPage;
