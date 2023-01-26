import { BookingSummary } from "@components/BookingSummary";
import { Timer } from "@components/Timer";
import { useSeatStore } from "@store/store";
import Link from "next/link";
import { useEffect } from "react";
import { SBClient } from "utils/SBClient";
import useSessionTimer from "utils/useTimer";

const Checkout = () => {
  const supabase = SBClient.getInstance();
  const { deselectAll, bookSeat } = useSeatStore();
  const seats = useSeatStore(state => state.seats);
  const selectedSeats = useSeatStore(state => state.selectedSeats);
  const { start, isRunning, timeLeft } = useSessionTimer();

  let realtimeSeats = supabase.getRealtimeSeats();

  useEffect(() => {
    if (!isRunning && selectedSeats.length > 0) {
      start();
    }
  }, []);

  useEffect(() => {
    if (realtimeSeats != undefined) {
      deselectAll(true);
      bookSeat(realtimeSeats.id);
      stop();
      alert("One or more of your selected seats has been booked! Chose other seats and try again.");
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
    if (timeLeft === 0 && selectedSeats.length > 0) {
      deselectAll();
      stop();
    }
  }, [timeLeft, selectedSeats]);

  const bookSeats = async () => {
    const bookedSeats = selectedSeats.map(id => {
      bookSeat(id);
      return { id, status: "booked" };
    });
    const bookSeatsResult = await supabase.upsert("seat", bookedSeats);
    if (bookSeatsResult.success) {
      alert("Your seats have been booked successfully!");
    } else {
      alert("SEAT BOOKING FAILED");
    }
    deselectAll(true);
    stop();
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
