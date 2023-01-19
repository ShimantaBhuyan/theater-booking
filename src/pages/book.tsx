import SeatLayout from "@components/SeatLayout";
import { SeatLegend } from "@components/SeatLegend";

const BookScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl">Book your seats</h1>
      <SeatLegend />
      <SeatLayout />
    </div>
  );
};

export default BookScreen;
