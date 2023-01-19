import { Seat } from "@components/Seat";
import React, { useEffect } from "react";
import { useSeatStore, dummyCinemaLayout, Seat as SeatProps } from "@store/store";
import { getSeatLayout } from "utils/getSeatLayout";

const SeatLayout: React.FC = () => {
  const { toggleSeat, seats, setSeats } = useSeatStore();

  useEffect(() => {
    setSeats(getSeatLayout(dummyCinemaLayout));
  }, []);

  const rows: { [rowId: string]: SeatProps[] } = seats.reduce((rows: { [rowId: string]: SeatProps[] }, seat) => {
    const [, rowId] = seat.id.split("-");
    if (!rows[rowId]) {
      rows[rowId] = [seat];
    } else {
      rows[rowId].push(seat);
    }
    return rows;
  }, {});

  return (
    <div className="flex justify-center items-center flex-wrap sm:w-[75%]">
      {Object.values(rows).map((cinemaSeat, index) => {
        return (
          <div className="w-full flex justify-center items-center" key={index}>
            <div className="flex flex-wrap">
              {cinemaSeat.map(seat => (
                <Seat
                  key={seat.id}
                  id={seat.id}
                  status={seat.status}
                  onClick={() => {
                    toggleSeat(seat.id);
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SeatLayout;
