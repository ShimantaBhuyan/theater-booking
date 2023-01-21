import { BookingSummary } from "@components/BookingSummary";

const Checkout = () => {
  // TODO: Implement countdown timer
  const bookSeats = () => {
    console.log("BOOKING SEATS...");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <BookingSummary />
      <button
        type="button"
        onClick={bookSeats}
        className="px-4 py-2 bg-gray-700 rounded-md w-full text-gray-300 dark:text-gray-300 drop-shadow-lg"
      >
        Book Seats
      </button>
    </div>
  );
};

export default Checkout;
