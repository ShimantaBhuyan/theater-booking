import { useSeatStore } from "@store/store";
import { useState, useEffect } from "react";
import { getSeatPrice } from "utils/getSeatPrice";

export const BookingSummary = () => {
  const { cinemaLayout } = useSeatStore();
  const selectedSeats = useSeatStore(state => state.selectedSeats);

  const [bookedSeats, setBookedSeats] = useState<string[][]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const prices = getSeatPrice(selectedSeats, cinemaLayout);
    setBookedSeats(prices);
    const totalPrice = prices.reduce((total, item) => total + parseInt(item[1]), 0);
    setTotalAmount(totalPrice);
    console.log({ selectedSeats, prices, totalPrice });
  }, [selectedSeats.length]);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="text-lg font-medium border-b-2">Selected Seats</p>
      {bookedSeats.length > 0
        ? bookedSeats.map(seat => {
            return (
              <p className="text-md" key={`booked-seat-${seat[0]}`}>
                Seat {seat[0]} = &#8377;{seat[1]}{" "}
              </p>
            );
          })
        : null}
      {totalAmount > 0 ? <h2 className="text-lg font-bold">Total amount: &#8377;{totalAmount}</h2> : null}
    </div>
  );
};
