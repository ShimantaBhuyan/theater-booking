import { Seat } from "@components/Seat";
import React, { useEffect } from "react";
import { useSeatStore, dummyLayout, Seat as SeatProps } from "@store/store";

const SeatSelection: React.FC = () => {
  const { setSeats, toggleSeat, getSeats } = useSeatStore();

  const seatLayout = getSeats();

  useEffect(() => {
    setSeats(dummyLayout);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-center items-center w-fit">
        {seatLayout.map((seat: SeatProps) => (
          <Seat
            key={seat.id}
            id={seat.id}
            status={seat.status}
            onClick={() => {
              console.log({ seat });
              toggleSeat(seat.id);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default SeatSelection;
