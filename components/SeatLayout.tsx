import { Seat } from "@components/Seat";
import React, { useEffect, useState } from "react";
import { useSeatStore, dummyCinemaLayout, Seat as SeatProps } from "@store/store";
import { getSeatLayout } from "utils/getSeatLayout";

const SeatLayout: React.FC = () => {
  const { setCinemaLayout, cinemaLayout, toggleSeat, seats, setSeats } = useSeatStore();
  const [rows, setRows] = useState<{ [rowId: string]: SeatProps[] }>({});

  console.log({ cinemaLayout, seats });

  // useEffect(() => {
  //   console.log("SEAT LAYOUT USE EFFECT INITIAL");
  //   if (cinemaLayout.rows.length === 0) {
  //     console.log("SEAT LAYOUT USE EFFECT INITIAL INSIDE IF");
  //     setCinemaLayout(dummyCinemaLayout);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log("SEAT LAYOUT USE EFFECT");
  //   if (cinemaLayout.rows.length > 0) {
  //     console.log("SEAT LAYOUT USE EFFECT INSIDE IF");
  //     setSeats(getSeatLayout(cinemaLayout));
  //   }
  // }, [cinemaLayout]);

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

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col">
        {cinemaLayout.rows.map(rowData => (
          <p key={`row-${rowData.id}-pricing`} className="h-6 sm:h-12 flex items-center">
            &#8377;{rowData.price}
          </p>
        ))}
      </div>
      <div className="flex justify-center items-center flex-wrap sm:w-[75%]">
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
