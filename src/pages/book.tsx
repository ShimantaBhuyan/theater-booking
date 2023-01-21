import SeatLayout from "@components/SeatLayout";
import { SeatLegend } from "@components/SeatLegend";
import { useSeatStore } from "@store/store";

const BookScreen = () => {
  const { setCinemaLayout, cinemaLayout, seats, setSeats, reserveSeats, disableSeats, selectedSeats, deselectAll } =
    useSeatStore();
  // TODO: Add booking logic: fetch selected seats + show total price for user + show book button which takes to checkout/summary page
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl">Book your seats</h1>
      <SeatLegend />
      <SeatLayout />
    </div>
  );
};

export default BookScreen;
