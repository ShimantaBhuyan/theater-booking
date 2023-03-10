import { BookingSummary } from "@components/BookingSummary";
import SeatLayout from "@components/SeatLayout";
import { SeatLegend } from "@components/SeatLegend";
import { Timer } from "@components/Timer";
import { Seat, useSeatStore } from "@store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SBClient } from "utils/SBClient";
import useSessionTimer from "utils/useTimer";

const BookScreen = () => {
  const router = useRouter();
  const selectedSeats = useSeatStore(state => state.selectedSeats);
  const seats = useSeatStore(state => state.seats);
  const { bookSeat, setCinemaLayout, setSeats } = useSeatStore();
  const { timeLeft, stop } = useSessionTimer();
  const { deselectAll } = useSeatStore();

  const supabase = SBClient.getInstance();
  let realtimeSeats = supabase.getRealtimeSeats();

  useEffect(() => {
    const getDBValues = async () => {
      const rowsData = await supabase.fetchRows();
      const seatsData = await supabase.fetchSeats();
      if (rowsData.success) {
        setCinemaLayout({ rows: rowsData.data?.data as Array<{ id: string; numCols: number; price: number }> });
      } else {
        alert("Failed to load cinema layout...");
      }
      if (seatsData.success) {
        setSeats(seatsData.data?.data as Seat[]);
      } else {
        alert("Failed to load seats for cinema...");
      }
    };
    getDBValues();
  }, []);

  useEffect(() => {
    if (realtimeSeats != undefined) {
      // find if any seat in selectedSeats is present in realtimeSeats
      const selectedSeatsPresent = selectedSeats.some(seat => realtimeSeats.id === seat);
      if (selectedSeatsPresent) {
        deselectAll(true);
        bookSeat(realtimeSeats.id);
        stop();
        alert("One or more of your selected seats has been booked! Chose other seats and try again.");
      }
    }
  }, [realtimeSeats]);

  useEffect(() => {
    const isSelectedSeatsBooked = selectedSeats.some(seat =>
      seats.find(_seat => _seat.id === seat && _seat.status === "booked"),
    );
    if (isSelectedSeatsBooked) {
      deselectAll(true);
      stop();
      alert("One or more of your selected seats has been booked! Chose other seats and try again.");
    }
  }, [seats]);

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
