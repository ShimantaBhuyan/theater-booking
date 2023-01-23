import { Seat } from "@components/Seat";
import React, { useEffect, useState } from "react";
import { useSeatStore, dummyCinemaLayout, Seat as SeatProps } from "@store/store";
import { getSeatLayout } from "utils/getSeatLayout";

const SeatLayout: React.FC = () => {
  const { cinemaLayout, toggleSeat, seats } = useSeatStore();
  const [rows, setRows] = useState<{ [rowId: string]: SeatProps[] }>({});
  const [seatPrices, setSeatPrices] = useState<string[]>([]);

  useEffect(() => {
    let cinemaSeatData = seats.reduce((rows: { [rowId: string]: SeatProps[] }, seat) => {
      const [, rowId] = seat.id.split("-");
      if (!rows[rowId]) {
        rows[rowId] = [seat];
      } else {
        rows[rowId].push(seat);
      }
      return rows;
    }, {});
    setRows(cinemaSeatData);
  }, [seats]);

  useEffect(() => {
    if (cinemaLayout.rows.length > 0) {
      let prices = cinemaLayout.rows.map(rowData => rowData.price.toString());
      setSeatPrices(prices);
    }
  }, [cinemaLayout]);

  return (
    <div className="flex justify-center items-center min-w-[300px]">
      <div className="flex flex-col">
        {seatPrices.length > 0
          ? seatPrices.map((price, index) => (
              <p key={`row-${index + 1}-pricing`} className="h-6 sm:h-12 flex items-center text-sm sm:text-md">
                &#8377;{price}
              </p>
            ))
          : null}
      </div>
      <div className="flex justify-center items-center flex-wrap w-full sm:w-[75%]">
        {Object.values(rows).length > 0
          ? Object.values(rows).map((cinemaSeat, index) => {
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
            })
          : null}
      </div>
    </div>
  );
};

export default SeatLayout;
