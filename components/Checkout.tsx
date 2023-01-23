import { BookingSummary } from "@components/BookingSummary";
import { Timer } from "@components/Timer";
import { useSeatStore } from "@store/store";
import Link from "next/link";
import { useEffect } from "react";
import useSessionTimer from "utils/useTimer";

const Checkout = () => {
  const { deselectAll } = useSeatStore();
  const selectedSeats = useSeatStore(state => state.selectedSeats);
  const { start, isRunning, timeLeft } = useSessionTimer();

  useEffect(() => {
    if (!isRunning && selectedSeats.length > 0) {
      start();
    }
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && selectedSeats.length > 0) {
      deselectAll();
      stop();
    }
  }, [timeLeft, selectedSeats]);

  const bookSeats = () => {
    //   TODO: Call DB func to update booked seats
    console.log("BOOKING SEATS...");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl">Checkout Summary</h1>
      {selectedSeats.length > 0 ? (
        <>
          <Timer />
          <BookingSummary />
          <button
            type="button"
            onClick={bookSeats}
            className="px-4 py-2 bg-gray-700 rounded-md w-full text-gray-300 dark:text-gray-300 drop-shadow-lg"
          >
            Book Seats
          </button>
        </>
      ) : (
        <h2 className="text-3xl">
          Go to{" "}
          <Link href={"/book"} className="underline">
            Booking page
          </Link>{" "}
          to book your seats
        </h2>
      )}
    </div>
  );
};

export default Checkout;
