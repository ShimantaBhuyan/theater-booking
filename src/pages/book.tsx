import { BookingSummary } from "@components/BookingSummary";
import SeatLayout from "@components/SeatLayout";
import { SeatLegend } from "@components/SeatLegend";
import { useRouter } from "next/router";

const BookScreen = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl">Book your seats</h1>
      <SeatLegend />
      <SeatLayout />
      <BookingSummary />
      <button
        type="button"
        onClick={() => router.push("/checkout")}
        className="px-4 py-2 bg-gray-700 rounded-md w-full text-gray-300 dark:text-gray-300 drop-shadow-lg w-fit"
      >
        Chose Seats
      </button>
    </div>
  );
};

export default BookScreen;
