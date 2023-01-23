import { BookingSummary } from "@components/BookingSummary";
import SeatLayout from "@components/SeatLayout";
import { SeatLegend } from "@components/SeatLegend";
import { Timer } from "@components/Timer";
import { useSeatStore } from "@store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSessionTimer from "utils/useTimer";

const BookScreen = () => {
  const router = useRouter();
  const { selectedSeats } = useSeatStore();
  const { isRunning, countdownTime, timeLeft, stop } = useSessionTimer();
  const { deselectAll } = useSeatStore();

  useEffect(() => {
    if (timeLeft <= 0) {
      deselectAll();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (selectedSeats.length === 0) {
      stop();
    }
  }, [selectedSeats.length]);

  // useEffect(() => {
  //   if (isRunning) {
  //     setLeftTime(countdownTime);
  //   }
  // }, [isRunning]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl">Book your seats</h1>
      <SeatLegend />
      <SeatLayout />
      {selectedSeats.length > 0 ? (
        <>
          <Timer />
          <BookingSummary />
          <button
            type="button"
            onClick={() => router.push("/checkout")}
            className="px-4 py-2 bg-gray-700 rounded-md w-full text-gray-300 dark:text-gray-300 drop-shadow-lg w-fit"
          >
            Chose Seats
          </button>
        </>
      ) : null}
    </div>
  );
};

export default BookScreen;
