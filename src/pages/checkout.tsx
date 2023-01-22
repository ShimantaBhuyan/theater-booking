import { BookingSummary } from "@components/BookingSummary";
import { Timer } from "@components/Timer";
import { useSeatStore } from "@store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSessionTimer from "utils/useTimer";

const Checkout = () => {
  // TODO: On refresh page crashes
  const { deselectAll } = useSeatStore();
  const selectedSeats = useSeatStore(state => state.selectedSeats);
  // TODO: Implement countdown timer
  const { start, isRunning, countdownTime, timeLeft } = useSessionTimer();

  useEffect(() => {
    console.log("INSIDE CHECKOUT USE EFFECT: ", { isRunning, selectedSeats });
    if (!isRunning && selectedSeats.length > 0) {
      console.log("INSIDE CHECKOUT USE EFFECT IF CONDITION: ", { isRunning, selectedSeats });
      start();
    }
  }, []);

  // useEffect(() => {
  //   console.log("INSIDE CHECKOUT PAGE EFFECT: ", { isRunning, countdownTime });
  //   if (countdownTime === "0") {
  //     console.log("DESELECTING ALL...");
  //     deselectAll();
  //   }
  // }, [countdownTime]);

  useEffect(() => {
    console.log("SELECTED SEATS INSIDE CHECKOUT PAGE USE EFFECT: ", { selectedSeats });
    if (selectedSeats.length === 0) {
      console.log("STOPPING TIMER...");
      stop();
    }
  }, [selectedSeats.length]);

  // useEffect(() => {
  //   if (isRunning) {
  //     setLeftTime(countdownTime);
  //   }
  // }, [isRunning]);

  const bookSeats = () => {
    console.log("BOOKING SEATS...");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl">Checkout Summary</h1>
      {timeLeft > 0 ? (
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
